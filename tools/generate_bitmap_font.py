#!/usr/bin/env python3
#
#  FILE NAME: generate_bitmap_font.py
#  DESC:      Generate a bitmap font (BMFont XML *.fnt + *.png) from a TrueType/OpenType font,
#             in the format the engine's fontManager loads (same as the fonts made with BMFont).
#             The size is the line height in pixels, like BMFont (lineHeight = size).
#             Glyphs are white with the coverage in the alpha channel and are packed with
#             1 pixel of transparency between them (--spacing). --outline N adds a black outline
#             N pixels wide, like the BMFont outline fonts (the sprite color tints only the glyph).
#             Needs ImageMagick (magick) on PATH. Run it from the game folder (paths are relative to it).
#  EXAMPLES:
#    python3 ../tools/generate_bitmap_font.py \
#        /usr/share/fonts/TTF/DejaVuSans.ttf 45 data/textures/fonts/dejavu_sans_reg_45
#
#    python3 ../tools/generate_bitmap_font.py \
#        /usr/share/fonts/TTF/DejaVuSansCondensed-Bold.ttf 32 data/textures/fonts/dejavu_sans_cond_bold_32 \
#        --chars 32-123,125-126,192-255 --padding 1,0,0,1 --spacing 1,1
#
#    python3 ../tools/generate_bitmap_font.py \
#        /usr/share/fonts/TTF/DejaVuSansCondensed.ttf 25 data/textures/fonts/dejavu_sans_cond_outline_25 --outline 2
#

import argparse
import math
import shutil
import struct
import subprocess
import sys
from pathlib import Path
from xml.sax.saxutils import quoteattr


# Printable ASCII without '|', which the engine uses as a line break
DEFAULT_CHARS = '32-123,125-126'
AUTO_WIDTHS = (256, 512, 1024, 2048, 4096)


class FontFile:
    """ The metrics the generator needs, read from the font's sfnt tables """

    def __init__(self, path):
        self.data = Path(path).read_bytes()

        if self.data[:4] == b'ttcf':
            sys.exit(f'Error: font collections (.ttc) are not supported ({path})')

        self.tables = {}
        num_tables = self.u16(4)
        for i in range(num_tables):
            tag, _, offset, _ = struct.unpack_from('>4sIII', self.data, 12 + i * 16)
            self.tables[tag.decode('latin-1')] = offset

        for tag in ('head', 'hhea', 'hmtx', 'cmap'):
            if tag not in self.tables:
                sys.exit(f'Error: font has no {tag} table ({path})')

        head = self.tables['head']
        self.units_per_em = self.u16(head + 18)
        mac_style = self.u16(head + 44)

        hhea = self.tables['hhea']
        self.num_hmetrics = self.u16(hhea + 34)

        # BMFont (Windows GDI) sizes the font by its cell height: usWinAscent + usWinDescent
        os2 = self.tables.get('OS/2')
        if os2 is not None:
            fs_selection = self.u16(os2 + 62)
            self.ascent = self.u16(os2 + 74)
            self.descent = self.u16(os2 + 76)
            self.bold = bool(fs_selection & 0x20)
            self.italic = bool(fs_selection & 0x01)
        else:
            self.ascent = self.s16(hhea + 4)
            self.descent = -self.s16(hhea + 6)
            self.bold = bool(mac_style & 0x01)
            self.italic = bool(mac_style & 0x02)

        self.cmap = self.load_cmap()
        self.face = self.load_family_name() or Path(path).stem

    def u16(self, offset):
        return struct.unpack_from('>H', self.data, offset)[0]

    def s16(self, offset):
        return struct.unpack_from('>h', self.data, offset)[0]

    def u32(self, offset):
        return struct.unpack_from('>I', self.data, offset)[0]

    def advance(self, glyph_id):
        index = min(glyph_id, self.num_hmetrics - 1)
        return self.u16(self.tables['hmtx'] + index * 4)

    def load_cmap(self):
        cmap = self.tables['cmap']
        char_map = {}

        for i in range(self.u16(cmap + 2)):
            platform, encoding, offset = struct.unpack_from('>HHI', self.data, cmap + 4 + i * 8)
            if platform != 0 and not (platform == 3 and encoding in (1, 10)):
                continue

            sub = cmap + offset
            fmt = self.u16(sub)

            if fmt == 4:
                seg_x2 = self.u16(sub + 6)
                ends = sub + 14
                starts = ends + seg_x2 + 2
                deltas = starts + seg_x2
                ranges = deltas + seg_x2
                for s in range(0, seg_x2, 2):
                    end = self.u16(ends + s)
                    start = self.u16(starts + s)
                    delta = self.u16(deltas + s)
                    range_offset = self.u16(ranges + s)
                    for code in range(start, min(end, 0xFFFE) + 1):
                        if range_offset == 0:
                            glyph_id = (code + delta) & 0xFFFF
                        else:
                            glyph_id = self.u16(ranges + s + range_offset + (code - start) * 2)
                            if glyph_id:
                                glyph_id = (glyph_id + delta) & 0xFFFF
                        if glyph_id:
                            char_map.setdefault(code, glyph_id)

            elif fmt == 12:
                for g in range(self.u32(sub + 12)):
                    start, end, start_glyph = struct.unpack_from('>III', self.data, sub + 16 + g * 12)
                    for code in range(start, end + 1):
                        char_map.setdefault(code, start_glyph + code - start)

        return char_map

    def load_family_name(self):
        name = self.tables.get('name')
        if name is None:
            return None

        strings = name + self.u16(name + 4)
        fallback = None
        for i in range(self.u16(name + 2)):
            platform, encoding, _, name_id, length, offset = struct.unpack_from('>6H', self.data, name + 6 + i * 12)
            if name_id != 1:
                continue
            raw = self.data[strings + offset:strings + offset + length]
            if platform == 3 or platform == 0:
                return raw.decode('utf-16-be', errors='replace')
            if platform == 1 and fallback is None:
                fallback = raw.decode('latin-1')

        return fallback


class Glyph:
    def __init__(self, code):
        self.code = code
        self.xadvance = 0

        # Ink bounding box relative to the pen origin on the baseline (y down)
        self.ink_x = 0
        self.ink_y = 0
        self.ink_w = 0
        self.ink_h = 0

        # Rect in the texture, including the padding
        self.x = 0
        self.y = 0
        self.w = 0
        self.h = 0


def parse_int_list(text, count, name):
    try:
        values = [int(v) for v in text.split(',')]
    except ValueError:
        values = []
    if len(values) != count or any(v < 0 for v in values):
        sys.exit(f'Error: --{name} needs {count} comma separated numbers ({text})')
    return values


def parse_chars(text):
    codes = []
    for part in text.split(','):
        part = part.strip()
        try:
            if '-' in part:
                first, last = (int(v, 0) for v in part.split('-'))
                codes.extend(range(first, last + 1))
            else:
                codes.append(int(part, 0))
        except ValueError:
            sys.exit(f'Error: bad --chars range ({part}). Use character codes, like 32-126,160-255')

    # Keep the order, drop duplicates
    return list(dict.fromkeys(codes))


def round_half_up(value):
    return int(math.floor(value + 0.5))


def annotate_text(code):
    # ImageMagick reads '%' as a property escape, '\' as an escape and a leading '@' as a file name
    char = chr(code)
    if char == '%':
        return '%%'
    if char in '\\@':
        return '\\' + char
    return char


def run_magick(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        sys.exit(f'Error: ImageMagick failed:\n{result.stderr}')
    return result.stdout


def measure_glyphs(font_path, point_size, size, glyphs):
    """ Render each glyph on its own canvas to find its ink bounding box """
    canvas = size * 4
    origin_x = size
    origin_y = size * 2

    cmd = ['magick', '-quiet', '-density', '72', '-font', str(font_path),
           '-pointsize', f'{point_size:.4f}', '-fill', 'white']
    for glyph in glyphs:
        cmd += ['(', '-size', f'{canvas}x{canvas}', 'xc:none',
                '-annotate', f'+{origin_x}+{origin_y}', annotate_text(glyph.code), ')']
    cmd += ['-format', '%@ %[fx:maxima.a]\n', 'info:']

    lines = run_magick(cmd).split()
    if len(lines) != len(glyphs) * 2:
        sys.exit('Error: unexpected output from ImageMagick while measuring the glyphs')

    for i, glyph in enumerate(glyphs):
        geometry, coverage = lines[i * 2], float(lines[i * 2 + 1])
        if coverage == 0:
            continue

        wh, x, y = geometry.split('+')
        w, h = wh.split('x')
        glyph.ink_w = int(w)
        glyph.ink_h = int(h)
        glyph.ink_x = int(x) - origin_x
        glyph.ink_y = int(y) - origin_y

        if (glyph.ink_x <= -origin_x or glyph.ink_y <= -origin_y or
                glyph.ink_x + glyph.ink_w >= canvas - origin_x or glyph.ink_y + glyph.ink_h >= canvas - origin_y):
            sys.exit(f'Error: glyph {glyph.code} doesn\'t fit the measuring canvas')


def pack(glyphs, width, spacing):
    """ Shelf pack the glyphs, tallest first. Returns the texture height or None if a glyph is too wide """
    x = y = row_height = 0
    for glyph in sorted(glyphs, key=lambda g: (-g.h, -g.w, g.code)):
        if glyph.w > width:
            return None
        if x + glyph.w > width:
            x = 0
            y += row_height + spacing[1]
            row_height = 0
        glyph.x = x
        glyph.y = y
        x += glyph.w + spacing[0]
        row_height = max(row_height, glyph.h)

    return y + row_height


def render_texture(font_path, point_size, glyphs, padding, outline, width, height, png_path):
    """ Draw every glyph at its rect with the same pen offsets used to measure it """
    cmd = ['magick', '-quiet', '-density', '72', '-size', f'{width}x{height}', 'xc:none',
           '-font', str(font_path), '-pointsize', f'{point_size:.4f}', '-fill', 'white']
    for glyph in glyphs:
        pen_x = glyph.x + padding[3] - glyph.ink_x
        pen_y = glyph.y + padding[0] - glyph.ink_y
        cmd += ['-annotate', f'{pen_x:+d}{pen_y:+d}', annotate_text(glyph.code)]

    if outline:
        # Like the BMFont outline textures: the glyph in the color channels (white glyph, black outline)
        # and the glyph grown by the outline width in the alpha channel
        cmd += ['-alpha', 'extract', '(', '+clone', '-morphology', 'Dilate', f'Disk:{outline + 0.5}', ')',
                '-alpha', 'off', '-compose', 'CopyOpacity', '-composite', f'PNG32:{png_path}']
    else:
        # White glyphs with the coverage in the alpha channel, like the BMFont textures
        cmd += ['-alpha', 'extract', '-background', 'white', '-alpha', 'shape', f'PNG32:{png_path}']
    run_magick(cmd)


def write_fnt(fnt_path, png_path, font, size, base, padding, spacing, outline, width, height, glyphs):
    # Channels: 0 glyph, 1 outline, 4 one (white)
    channels = 'alphaChnl="1" redChnl="0" greenChnl="0" blueChnl="0"' if outline else \
               'alphaChnl="0" redChnl="4" greenChnl="4" blueChnl="4"'

    lines = [
        '<?xml version="1.0"?>',
        '<font>',
        f'  <info face={quoteattr(font.face)} size="{size}" bold="{int(font.bold)}" italic="{int(font.italic)}" '
        f'charset="" unicode="1" stretchH="100" smooth="1" aa="1" '
        f'padding="{",".join(map(str, padding))}" spacing="{",".join(map(str, spacing))}" outline="{outline}"/>',
        f'  <common lineHeight="{size}" base="{base}" scaleW="{width}" scaleH="{height}" pages="1" packed="0" '
        f'{channels}/>',
        '  <pages>',
        f'    <page id="0" file={quoteattr(png_path.name)} />',
        '  </pages>',
        f'  <chars count="{len(glyphs)}">',
    ]

    for g in glyphs:
        if g.w:
            xoffset = g.ink_x - padding[3]
            yoffset = g.ink_y + base - padding[0]
        else:
            xoffset = yoffset = 0
        lines.append(f'    <char id="{g.code}" x="{g.x}" y="{g.y}" width="{g.w}" height="{g.h}" '
                     f'xoffset="{xoffset}" yoffset="{yoffset}" xadvance="{g.xadvance}" page="0" chnl="15" />')

    lines += ['  </chars>', '</font>', '']
    fnt_path.write_text('\n'.join(lines), encoding='utf-8')


def main():
    parser = argparse.ArgumentParser(
        description='Generate a bitmap font (BMFont XML *.fnt + *.png) from a TrueType/OpenType font.')
    parser.add_argument('font', help='TrueType/OpenType font file (.ttf/.otf)')
    parser.add_argument('size', type=int, help='line height in pixels (BMFont size)')
    parser.add_argument('output', help='output path without extension, e.g. data/textures/fonts/dejavu_sans_reg_45')
    parser.add_argument('--chars', default=DEFAULT_CHARS,
                        help=f'character code ranges (default {DEFAULT_CHARS}: printable ASCII without "|", '
                             'the engine\'s line break)')
    parser.add_argument('--padding', default='1,0,0,1',
                        help='transparent pixels inside each glyph rect: up,right,down,left (default 1,0,0,1, '
                             'like the existing fonts). The engine reads single digits and adds the left/up '
                             'values to the character advance and line height')
    parser.add_argument('--spacing', default='1,1',
                        help='transparent pixels between the glyph rects: horizontal,vertical (default 1,1)')
    parser.add_argument('--outline', type=int, default=0,
                        help='black outline width in pixels around the white glyphs (default 0: no outline). '
                             'The sprite color tints the glyph and the outline stays black')
    parser.add_argument('--width', type=int, default=0,
                        help='texture width (default 0: the smallest of 256, 512, ... that keeps it no taller than wide)')
    args = parser.parse_args()

    if shutil.which('magick') is None:
        sys.exit('Error: ImageMagick (magick) not found on PATH')

    font_path = Path(args.font)
    if not font_path.is_file():
        sys.exit(f'Error: font file not found ({font_path})')
    if args.size <= 0:
        sys.exit('Error: size must be greater than 0')

    padding = parse_int_list(args.padding, 4, 'padding')
    spacing = parse_int_list(args.spacing, 2, 'spacing')
    if max(padding) > 9:
        sys.exit('Error: the engine only reads single digit padding values (0-9)')
    if args.outline < 0:
        sys.exit('Error: --outline can\'t be negative')

    output = Path(args.output)
    if output.suffix.lower() in ('.fnt', '.png'):
        output = output.with_suffix('')
    fnt_path = output.with_name(output.name + '.fnt')
    png_path = output.with_name(output.name + '.png')
    output.parent.mkdir(parents=True, exist_ok=True)

    font = FontFile(font_path)

    # Pixels per em so the cell height (ascent + descent) is the requested size, like BMFont
    cell_units = font.ascent + font.descent
    point_size = args.size * font.units_per_em / cell_units
    base = round_half_up(font.ascent * args.size / cell_units)

    glyphs = []
    for code in parse_chars(args.chars):
        glyph_id = font.cmap.get(code)
        if glyph_id is None:
            print(f'Warning: the font has no glyph for character {code} ({chr(code)!r}), skipped')
            continue
        glyph = Glyph(code)
        # Truncated like BMFont's, so text is as wide as in the existing fonts
        glyph.xadvance = math.floor(font.advance(glyph_id) * point_size / font.units_per_em)
        glyphs.append(glyph)

    if not glyphs:
        sys.exit('Error: no characters to generate')

    measure_glyphs(font_path, point_size, args.size, glyphs)

    ink_glyphs = [g for g in glyphs if g.ink_w]
    for g in ink_glyphs:
        # The outline grows the ink box by its width on every side
        g.ink_x -= args.outline
        g.ink_y -= args.outline
        g.ink_w += args.outline * 2
        g.ink_h += args.outline * 2
        g.w = g.ink_w + padding[1] + padding[3]
        g.h = g.ink_h + padding[0] + padding[2]

    widths = (args.width,) if args.width > 0 else AUTO_WIDTHS
    for width in widths:
        height = pack(ink_glyphs, width, spacing)
        if height is not None and (height <= width or args.width > 0):
            break
    else:
        sys.exit('Error: a glyph is wider than the texture width')

    render_texture(font_path, point_size, ink_glyphs, padding, args.outline, width, height, png_path)
    write_fnt(fnt_path, png_path, font, args.size, base, padding, spacing, args.outline, width, height, glyphs)

    print(f'Wrote {fnt_path} and {png_path} ({width}x{height}, {len(glyphs)} characters, '
          f'lineHeight {args.size}, base {base})')


if __name__ == '__main__':
    main()
