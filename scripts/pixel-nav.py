"""Пиксельные стикеры для меню: рисуются из текстовых сетей, как остальные спрайты сайта.
Запуск: python3 scripts/pixel-nav.py  (кладёт SVG в src/assets/pixel/)"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'pixel'
PAL = {'#': '#14205C', 'y': '#FFD36E', 'r': '#FF8FA8', 'w': '#FFFFFF', 'b': '#9DBBFF', 'p': '#FFB3C7'}

ICONS = {
    'nav-home': [
        '....#....',
        '...#r#...',
        '..#rrr#..',
        '.#rrrrr#.',
        '#########',
        '.#wwwww#.',
        '.#ww#ww#.',
        '.#ww#ww#.',
        '.#######.',
    ],
    'nav-about': [
        '#.......#',
        '##.....##',
        '#y#####y#',
        '#yyyyyyy#',
        '#y#yyy#y#',
        '#yyyryyy#',
        '#yyyyyyy#',
        '.#yyyyy#.',
        '..#####..',
    ],
    'nav-projects': [
        '.####....',
        '#bbbb#...',
        '#########',
        '#bbbbbbb#',
        '#bbbybbb#',
        '#bbbbbbb#',
        '#bbbbbbb#',
        '#bbbbbbb#',
        '#########',
    ],
    'nav-music': [
        '..######.',
        '..#yyyy#.',
        '..#....#.',
        '..#....#.',
        '..#....#.',
        '.##...##.',
        '#pp#.#pp#',
        '#pp#.#pp#',
        '.##...##.',
    ],
    'nav-contact': [
        '#########',
        '#w#####w#',
        '#ww###ww#',
        '#www#www#',
        '#wwwrwww#',
        '#wwwwwww#',
        '#########',
    ],
}

for name, rows in ICONS.items():
    w, h = len(rows[0]), len(rows)
    assert all(len(r) == w for r in rows), name
    rects = []
    for y, row in enumerate(rows):
        x = 0
        while x < w:
            c = row[x]
            if c == '.':
                x += 1
                continue
            e = x
            while e < w and row[e] == c:
                e += 1
            rects.append(f'<rect x="{x}" y="{y}" width="{e - x}" height="1" fill="{PAL[c]}"/>')
            x = e
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" shape-rendering="crispEdges">'
           + ''.join(rects) + '</svg>')
    (OUT / f'{name}.svg').write_text(svg)
    print(name, w, h)
