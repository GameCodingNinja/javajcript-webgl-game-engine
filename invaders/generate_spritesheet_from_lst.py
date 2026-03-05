#!/usr/bin/env python3
#
#  FILE NAME: generate_spritesheet_from_lst.py
#  DESC:      Generate sprite sheet assets from a source objectDataList (*.lst)
#  EXAMPLES:
#    python3 generate_spritesheet_from_lst.py \
#        data/objects/2d/objectDataList/level1DataList.lst
#
#    python3 generate_spritesheet_from_lst.py \
#        data/objects/2d/objectDataList/level1DataList.lst \
#        data/objects/2d/objectDataList/level1SpriteSheetDataList.lst \
#        data/textures/level/level1_spriteSheet.png \
#        data/objects/2d/mesh/level/level1.xml \
#        0
#

import argparse
import copy
from collections import Counter
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


X = 0
Y = 1
W = 2
H = 3
SPACING = 1
SRGB_PROFILE_CANDIDATES = [
    # GIMP profile candidates (public-domain sRGB profile if installed with GIMP)
    "/usr/share/gimp/2.0/profiles/sRGB-elle-V2-srgbtrc.icc",
    "/usr/share/gimp/2.0/profiles/sRGB-elle-V4-srgbtrc.icc",
    "/usr/share/gimp/2.99/profiles/sRGB-elle-V2-srgbtrc.icc",
    "/usr/share/gimp/2.99/profiles/sRGB-elle-V4-srgbtrc.icc",
    "/usr/share/gimp/profiles/sRGB-elle-V2-srgbtrc.icc",
    "/usr/share/gimp/profiles/sRGB-elle-V4-srgbtrc.icc",
    # Optional local override: drop a GIMP profile here to force usage.
    str(Path(__file__).resolve().parent / "development" / "profiles" / "sRGB-elle-V2-srgbtrc.icc"),
    str(Path(__file__).resolve().parent / "development" / "profiles" / "sRGB-elle-V4-srgbtrc.icc"),
    # Fallback system profiles
    "/usr/share/color/icc/colord/sRGB.icc",
    "/usr/share/ghostscript/iccprofiles/srgb.icc",
    "/usr/share/ghostscript/iccprofiles/esrgb.icc",
]


class Pair:
    def __init__(self, index, name, path, width, height):
        self.index = index
        self.name = name
        self.path = path
        self.width = width
        self.height = height
        self.pack_width = width + SPACING
        self.pack_height = height + SPACING


class Node:
    def __init__(self):
        self.rect = (0, 0, 0, 0)
        self.index = -1
        self.name = None
        self.path = None
        self.width = 0
        self.height = 0
        self.node = None

    def insert(self, pair):
        if self.node is not None:
            result = self.node[0].insert(pair)
            if result is not None:
                return result
            return self.node[1].insert(pair)

        if self.index > -1:
            return None

        if pair.pack_width > self.rect[W] or pair.pack_height > self.rect[H]:
            return None

        if pair.pack_width == self.rect[W] and pair.pack_height == self.rect[H]:
            self.index = pair.index
            self.name = pair.name
            self.path = pair.path
            self.width = pair.width
            self.height = pair.height
            return self

        self.node = (Node(), Node())

        width_delta = self.rect[W] - pair.pack_width
        height_delta = self.rect[H] - pair.pack_height

        if width_delta > height_delta:
            self.node[0].rect = (self.rect[X], self.rect[Y], pair.pack_width, self.rect[H])
            self.node[1].rect = (
                self.rect[X] + pair.pack_width,
                self.rect[Y],
                self.rect[W] - pair.pack_width,
                self.rect[H],
            )
        else:
            self.node[0].rect = (self.rect[X], self.rect[Y], self.rect[W], pair.pack_height)
            self.node[1].rect = (
                self.rect[X],
                self.rect[Y] + pair.pack_height,
                self.rect[W],
                self.rect[H] - pair.pack_height,
            )

        return self.node[0].insert(pair)


def get_image_size(path):
    output = subprocess.check_output(
        ["magick", "identify", "-format", "%w %h", str(path)],
        text=True,
    ).strip()
    width, height = output.split()
    return int(width), int(height)


def get_image_colorspace(path):
    return (
        subprocess.check_output(
            ["magick", "identify", "-format", "%[colorspace]", str(path)],
            text=True,
        )
        .strip()
        .upper()
    )


def detect_target_colorspace(pairs):
    counter = Counter()
    for pair in pairs:
        try:
            counter[get_image_colorspace(pair.path)] += 1
        except Exception:
            pass

    if len(counter) == 0:
        return "SRGB"

    return counter.most_common(1)[0][0]


def find_project_root(lst_path):
    current = lst_path.resolve()
    for parent in [current.parent] + list(current.parents):
        if (parent / "data").is_dir():
            return parent
    raise RuntimeError("Could not find project root (folder containing data/).")


def rel_or_abs(path, project_root):
    try:
        return str(path.resolve().relative_to(project_root.resolve())).replace("\\", "/")
    except ValueError:
        return str(path.resolve())


def parse_source_lst(source_lst_path):
    parser = ET.XMLParser(target=ET.TreeBuilder(insert_comments=True))
    tree = ET.parse(source_lst_path, parser=parser)
    root = tree.getroot()
    objects = root.findall(".//objectList/object")
    src_default = root.find("./default")
    src_default_visual = src_default.find("./visual") if src_default is not None else None
    return root, objects, src_default_visual


def collect_unique_images(project_root, src_objects):
    path_to_glyph = {}
    glyph_to_path = {}

    for obj in src_objects:
        for tex in obj.findall("./visual/texture"):
            file_attr = tex.get("file")
            if not file_attr or not file_attr.lower().endswith(".png"):
                continue

            count_attr = tex.get("count")
            if count_attr and "${NUM}" in file_attr:
                for i in range(int(count_attr)):
                    rel = file_attr.replace("${NUM}", str(i))
                    path = project_root / rel
                    if not path.exists():
                        raise RuntimeError(f"Missing source image: {rel}")
                    glyph = path.stem
                    existing = glyph_to_path.get(glyph)
                    if existing is not None and existing.resolve() != path.resolve():
                        raise RuntimeError(
                            f"Glyph name collision for '{glyph}' from:\n"
                            f"  - {existing}\n  - {path}\n"
                            "Rename one of the source image files so stems are unique."
                        )
                    path_to_glyph[str(path.resolve())] = glyph
                    glyph_to_path[glyph] = path
            else:
                rel = file_attr.replace("${NUM}", "0") if "${NUM}" in file_attr else file_attr
                path = project_root / rel
                if not path.exists():
                    raise RuntimeError(f"Missing source image: {rel}")
                glyph = path.stem
                existing = glyph_to_path.get(glyph)
                if existing is not None and existing.resolve() != path.resolve():
                    raise RuntimeError(
                        f"Glyph name collision for '{glyph}' from:\n"
                        f"  - {existing}\n  - {path}\n"
                        "Rename one of the source image files so stems are unique."
                    )
                path_to_glyph[str(path.resolve())] = glyph
                glyph_to_path[glyph] = path

    if len(glyph_to_path) == 0:
        raise RuntimeError("No PNG textures found in source object data list.")

    return path_to_glyph, glyph_to_path


def build_pairs(glyph_to_path):
    pairs = []
    for index, (glyph, path) in enumerate(sorted(glyph_to_path.items(), key=lambda kv: kv[0])):
        width, height = get_image_size(path)
        pairs.append(Pair(index, glyph, path, width, height))
    return pairs


def pack_with_width(pairs, width):
    sorted_pairs = sorted(pairs, key=lambda item: item.pack_height, reverse=True)
    head = Node()
    head.rect = (0, 0, width, 0x0FFFFFFF)

    placed_nodes = []
    final_width = 0
    final_height = 0

    for pair in sorted_pairs:
        node = head.insert(pair)
        if node is None:
            return None

        placed_nodes.append(node)
        right = node.rect[X] + pair.pack_width
        bottom = node.rect[Y] + pair.pack_height
        if right > final_width:
            final_width = right
        if bottom > final_height:
            final_height = bottom

    placed = []
    for node in sorted(placed_nodes, key=lambda item: item.index):
        placed.append((node.name, node.path, node.rect[X], node.rect[Y], node.width, node.height))
    return final_width, final_height, placed


def choose_packing(pairs, width):
    used_area = sum(item.width * item.height for item in pairs)
    min_width = max(item.pack_width for item in pairs)

    if width < 0:
        raise RuntimeError("width must be >= 0.")

    if width > 0:
        if width < min_width:
            raise RuntimeError(f"width ({width}) is too small. Minimum is {min_width}.")
        packed = pack_with_width(pairs, width)
        if packed is None:
            raise RuntimeError(f"Could not pack with width {width}.")
        out_width, out_height, placed = packed
        return out_width, out_height, placed, used_area, width

    best = None
    search_max = max(4096, min_width)
    for candidate in range(min_width, search_max + 1):
        packed = pack_with_width(pairs, candidate)
        if packed is None:
            continue

        out_width, out_height, placed = packed
        area = out_width * out_height
        waste = area - used_area
        score = (waste, area, abs(out_width - out_height), out_width)
        if best is None or score < best[0]:
            best = (score, out_width, out_height, placed, candidate)

    if best is None:
        raise RuntimeError("Failed to find a packing solution.")

    _, out_width, out_height, placed, chosen_width = best
    return out_width, out_height, placed, used_area, chosen_width


def write_sheet_png(out_png_path, out_width, out_height, placed, target_colorspace):
    out_png_path.parent.mkdir(parents=True, exist_ok=True)
    command = ["magick", "-size", f"{out_width}x{out_height}", "xc:none"]
    for _, path, x, y, _, _ in placed:
        command.extend([str(path), "-geometry", f"+{x}+{y}", "-composite"])
    profile = None
    if target_colorspace == "SRGB":
        for candidate in SRGB_PROFILE_CANDIDATES:
            path = Path(candidate)
            if path.is_file():
                profile = path
                break

    if profile is not None:
        command.extend(["-profile", str(profile)])
        command.extend(["-define", "png:exclude-chunk=cHRM,gAMA,sRGB"])
    else:
        command.extend(["-colorspace", target_colorspace, "-set", "colorspace", target_colorspace])

    command.append(str(out_png_path))
    subprocess.check_call(command)
    return profile


def write_sheet_xml(out_xml_path, out_width, out_height, placed):
    out_xml_path.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        '<?xml version="1.0"?>',
        f'<spriteSheet width="{out_width}" height="{out_height}">',
        "",
    ]
    for name, _, x, y, width, height in placed:
        lines.append(
            f'    <rect x1="{x:4d}" y1="{y:4d}" x2="{width:4d}" y2="{height:4d}" cx="{0:4d}" cy="{0:4d}" name="{name}"/>'
        )
    lines.extend(["", "</spriteSheet>", ""])
    out_xml_path.write_text("\n".join(lines), encoding="utf-8")


COMMENT = ET.Comment


def is_comment(elem):
    return elem.tag is COMMENT


def attrs_to_str(elem):
    if not elem.attrib:
        return ""
    return "".join([f' {k}="{v}"' for k, v in elem.attrib.items()])


def serialize(elem, indent=0):
    space = " " * indent
    if is_comment(elem):
        text = elem.text if elem.text is not None else ""
        return f"{space}<!--{text}-->"

    attr = attrs_to_str(elem)
    children = list(elem)
    text = (elem.text or "").strip()

    if not children and not text:
        return f"{space}<{elem.tag}{attr}/>"
    if not children and text:
        return f"{space}<{elem.tag}{attr}>{text}</{elem.tag}>"

    lines = [f"{space}<{elem.tag}{attr}>"]
    if text:
        lines.append(f"{space}    {text}")
    for child in children:
        lines.append(serialize(child, indent + 4))
    lines.append(f"{space}</{elem.tag}>")
    return "\n".join(lines)


def merge_visual(base_visual, override_visual):
    result = ET.Element("visual")
    if base_visual is not None:
        for child in list(base_visual):
            result.append(copy.deepcopy(child))

    if override_visual is None:
        return result

    for override_child in list(override_visual):
        replaced = False
        for i, existing in enumerate(list(result)):
            if (not is_comment(existing)) and existing.tag == override_child.tag:
                result.remove(existing)
                result.insert(i, copy.deepcopy(override_child))
                replaced = True
                break
        if not replaced:
            result.append(copy.deepcopy(override_child))

    return result


def build_generated_object_data_list(
    src_objects,
    src_default_visual,
    project_root,
    path_to_glyph,
    out_png_path,
    out_xml_path,
):
    out_png_rel = rel_or_abs(out_png_path, project_root)
    out_xml_rel = rel_or_abs(out_xml_path, project_root)

    lines = []
    lines.append('<?xml version="1.0"?>')
    lines.append("<objectDataList2D>")
    lines.append("")
    lines.append("    <!-- DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT -->")
    lines.append('    <default name="">')
    lines.append("        <visual>")
    lines.append(f'            <texture file="{out_png_rel}" filter="NEAREST"/>')
    lines.append('            <mesh genType="sprite_sheet">')
    lines.append(f'                <spriteSheet file="{out_xml_rel}"/>')
    lines.append("            </mesh>")
    lines.append('            <shader id="shader_2d_spriteSheet"/>')
    lines.append('            <color r="1" g="1" b="1" a="1"/>')
    lines.append("        </visual>")
    lines.append("    </default>")
    lines.append("    <!-- DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT DEFAULT -->")
    lines.append("")
    lines.append("    <objectList>")
    lines.append("")

    for src_obj in src_objects:
        obj_name = src_obj.get("name", "")
        src_visual = src_obj.find("./visual")

        has_png = False
        texture_nodes = []
        if src_visual is not None:
            texture_nodes = src_visual.findall("./texture")
            for texture_node in texture_nodes:
                file_attr = texture_node.get("file")
                if file_attr and file_attr.lower().endswith(".png"):
                    has_png = True
                    break

        if not has_png:
            out_obj = ET.Element("object", {"name": obj_name})
            merged_visual = merge_visual(src_default_visual, src_visual)

            texture = merged_visual.find("./texture")
            if texture is not None and texture.get("file") is None:
                texture.attrib.clear()
                texture.set("file", "")

            out_obj.append(merged_visual)
            for child in list(src_obj):
                if child.tag == "visual":
                    continue
                out_obj.append(copy.deepcopy(child))

            lines.append(serialize(out_obj, 8))
            lines.append("")
            continue

        out_obj = ET.Element("object", {"name": obj_name})
        out_visual = ET.SubElement(out_obj, "visual")

        src_mesh = src_visual.find("./mesh") if src_visual is not None else None
        is_scaled = src_mesh is not None and src_mesh.get("genType") == "scaled_frame"
        if is_scaled:
            out_mesh = ET.SubElement(out_visual, "mesh", {"genType": "scaled_frame"})
        else:
            out_mesh = ET.SubElement(out_visual, "mesh")

        out_sprite_sheet = ET.SubElement(out_mesh, "spriteSheet")
        for texture_node in texture_nodes:
            file_attr = texture_node.get("file")
            if not file_attr or not file_attr.lower().endswith(".png"):
                continue

            count_attr = texture_node.get("count")
            if count_attr and "${NUM}" in file_attr:
                for i in range(int(count_attr)):
                    rel = file_attr.replace("${NUM}", str(i))
                    image_path = (project_root / rel).resolve()
                    glyph = path_to_glyph[str(image_path)]
                    ET.SubElement(out_sprite_sheet, "glyph", {"id": glyph})
            else:
                rel = file_attr.replace("${NUM}", "0") if "${NUM}" in file_attr else file_attr
                image_path = (project_root / rel).resolve()
                glyph = path_to_glyph[str(image_path)]
                ET.SubElement(out_sprite_sheet, "glyph", {"id": glyph})

        if is_scaled:
            scaled_frame = src_mesh.find("./scaledFrame") if src_mesh is not None else None
            if scaled_frame is not None:
                ET.SubElement(out_mesh, "scaledFrame", dict(scaled_frame.attrib))
            ET.SubElement(out_visual, "shader", {"id": "shader_2d"})

        src_color = src_visual.find("./color") if src_visual is not None else None
        if src_color is not None:
            out_visual.append(copy.deepcopy(src_color))

        for child in list(src_obj):
            if child.tag == "visual":
                continue
            if child.tag == "size" and not is_scaled:
                continue
            out_obj.append(copy.deepcopy(child))

        lines.append(serialize(out_obj, 8))
        lines.append("")

    lines.append("    </objectList>")
    lines.append("")
    lines.append("</objectDataList2D>")
    lines.append("")
    return "\n".join(lines)


def resolve_outputs(source_lst_path, output_object_data_list, output_png_file, output_xml_file):
    source_no_ext = source_lst_path.with_suffix("")

    if output_object_data_list == "":
        out_lst_path = Path(str(source_no_ext) + "_spritesheet.lst")
    else:
        out_lst_path = Path(output_object_data_list).expanduser().resolve()

    if output_png_file == "":
        out_png_path = Path(str(source_no_ext) + "_spritesheet.png")
    else:
        out_png_path = Path(output_png_file).expanduser().resolve()

    if output_xml_file == "":
        out_xml_path = Path(str(source_no_ext) + "_spritesheet.xml")
    else:
        out_xml_path = Path(output_xml_file).expanduser().resolve()

    return out_lst_path, out_png_path, out_xml_path


def main():
    parser = argparse.ArgumentParser(
        description=(
            "Generate sprite sheet assets from a source object data list. "
            "Outputs: generated objectDataList, sprite sheet XML, sprite sheet PNG."
        )
    )
    parser.add_argument("source_data_list", help="Path to source object data list (*.lst)")
    parser.add_argument(
        "output_object_data_list",
        nargs="?",
        default="",
        help=(
            "Output path for generated sprite-sheet objectDataList (*.lst). "
            "Default: <source-no-ext>_spritesheet.lst"
        ),
    )
    parser.add_argument(
        "output_png_file",
        nargs="?",
        default="",
        help=(
            "Output file path for generated PNG. "
            "Default: <source-no-ext>_spritesheet.png"
        ),
    )
    parser.add_argument(
        "output_xml_file",
        nargs="?",
        default="",
        help=(
            "Output file path for generated XML. "
            "Default: <source-no-ext>_spritesheet.xml"
        ),
    )
    parser.add_argument(
        "width",
        nargs="?",
        type=int,
        default=0,
        help="Pack width. Use 0 for auto width search.",
    )
    args = parser.parse_args()

    source_lst_path = Path(args.source_data_list).expanduser().resolve()
    if not source_lst_path.is_file():
        raise RuntimeError(f"Input source lst file does not exist: {source_lst_path}")

    project_root = find_project_root(source_lst_path)

    out_lst_path, out_png_path, out_xml_path = resolve_outputs(
        source_lst_path,
        args.output_object_data_list,
        args.output_png_file,
        args.output_xml_file,
    )

    _, src_objects, src_default_visual = parse_source_lst(source_lst_path)
    path_to_glyph, glyph_to_path = collect_unique_images(project_root, src_objects)
    pairs = build_pairs(glyph_to_path)
    out_width, out_height, placed, used_area, chosen_width = choose_packing(pairs, args.width)

    target_colorspace = detect_target_colorspace(pairs)
    profile_used = write_sheet_png(
        out_png_path, out_width, out_height, placed, target_colorspace
    )
    write_sheet_xml(out_xml_path, out_width, out_height, placed)

    generated_lst = build_generated_object_data_list(
        src_objects,
        src_default_visual,
        project_root,
        path_to_glyph,
        out_png_path,
        out_xml_path,
    )
    out_lst_path.parent.mkdir(parents=True, exist_ok=True)
    out_lst_path.write_text(generated_lst, encoding="utf-8")

    print(f"Generated objectDataList: {out_lst_path}")
    print(f"Generated PNG: {out_png_path}")
    print(f"Generated XML: {out_xml_path}")
    print(f"Unique images: {len(pairs)}")
    print(f"Sheet size: {out_width}x{out_height}")
    print(f"Used area: {used_area}")
    print(f"Wasted area: {(out_width * out_height) - used_area}")
    print(f"Spacing: {SPACING}px")
    print(f"Chosen pack width: {chosen_width}")
    print(f"Target colorspace: {target_colorspace}")
    print(f"ICC profile used: {profile_used if profile_used is not None else 'none'}")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(1)
