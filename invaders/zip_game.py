#!/usr/bin/env python3
#
#  FILE NAME: zip_game.py
#  DESC:      Zip the game for upload to a game portal: bundle.js, index.html, favicon.ico and only
#             the files in the data folder the game loads at runtime.
#
#             The data files the game needs are found by following file references, starting from
#             bundle.js (it holds the imported JSON tables, .lst, .loader and .ai files) and index.html:
#             every "data/..." path found is added, and the text files it points to (.lst, .menu,
#             .strategy, .json...) are searched for more paths. XML comments are skipped, so commented
#             out files are left out. A path without an extension (fonts) adds all the files that
#             start with it (name.png, name.fnt).
#
#             Make a production build first (webpack --mode production) and bump the bundle.js
#             version in index.html for every upload.
#  EXAMPLES:
#    python3 zip_game.py
#    python3 zip_game.py Invaders.zip --list-unused
#

import argparse
import re
import sys
import zipfile
from pathlib import Path


# Files at the root of the zip (index.html must be at the root for game portals)
ROOT_FILES = ['index.html', 'bundle.js', 'favicon.ico']

# Files that aren't searched for more file references
BINARY_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.ogg', '.mp3', '.wav', '.ico', '.2dm'}

DATA_PATH_RE = re.compile(r'data/[A-Za-z0-9_\-./]+')
XML_COMMENT_RE = re.compile(r'<!--.*?-->', re.DOTALL)
VERSION_RE = re.compile(r'bundle\.js\?version=([^"\']+)')


def find_data_paths(text):
    """Return the "data/..." paths referenced in the text, skipping XML comments"""
    text = XML_COMMENT_RE.sub('', text)
    return {match.rstrip('./') for match in DATA_PATH_RE.findall(text)}


def collect_data_files(game_dir):
    """Follow the file references from the root files and return (data files used, missing references)"""
    used = set()
    missing = set()
    to_search = [game_dir / name for name in ROOT_FILES if name.endswith(('.js', '.html'))]

    while to_search:
        text = to_search.pop().read_text(encoding='utf-8', errors='replace')

        for ref in find_data_paths(text):
            path = game_dir / ref

            if path.is_file():
                files = [path]
            # A path without an extension (fonts): all the files that start with it (name.png, name.fnt)
            elif not path.suffix and path.parent.is_dir():
                files = sorted(path.parent.glob(path.name + '.*'))
            else:
                files = []

            if not files:
                if not path.is_dir():
                    missing.add(ref)
                continue

            for file in files:
                if file not in used:
                    used.add(file)
                    if file.suffix.lower() not in BINARY_EXTENSIONS:
                        to_search.append(file)

    return used, missing


def main():
    game_dir = Path(__file__).resolve().parent

    parser = argparse.ArgumentParser(description='Zip the game with only the data files it loads.')
    parser.add_argument('zip_file', nargs='?', default=f'{game_dir.name.capitalize()}.zip',
                        help='zip file to create (default: %(default)s in the game folder)')
    parser.add_argument('--list-unused', action='store_true',
                        help='list the data files that are left out')
    args = parser.parse_args()

    for name in ROOT_FILES:
        if not (game_dir / name).is_file():
            sys.exit(f'Error: {name} not found in {game_dir}')

    used, missing = collect_data_files(game_dir)

    zip_path = Path(args.zip_file)
    if not zip_path.is_absolute():
        zip_path = game_dir / zip_path

    files = [game_dir / name for name in ROOT_FILES] + sorted(used)
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for file in files:
            zip_file.write(file, file.relative_to(game_dir).as_posix())

    all_data = [p for p in (game_dir / 'data').rglob('*') if p.is_file()]
    unused = sorted(set(all_data) - used)
    data_size = sum(p.stat().st_size for p in used)

    version = VERSION_RE.search((game_dir / 'index.html').read_text(encoding='utf-8'))
    print(f'Created {zip_path} ({zip_path.stat().st_size / (1024 * 1024):.1f} MB)')
    print(f'  bundle.js version: {version.group(1) if version else "none"} (bump it for every upload)')
    print(f'  data files: {len(used)} of {len(all_data)} ({data_size / (1024 * 1024):.1f} MB), {len(unused)} left out')

    if args.list_unused:
        for path in unused:
            print(f'    left out: {path.relative_to(game_dir).as_posix()}')

    if missing:
        print('Warning: referenced but not found:')
        for ref in sorted(missing):
            print(f'    {ref}')


if __name__ == '__main__':
    main()
