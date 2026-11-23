# Вечерняя и ночная версии фона города из src/assets/img/city.webp.
# Без вырезания зданий: вся картинка перекрашивается «градиентной картой» по яркости,
# поэтому нет ореолов и рваных краёв. Окна — только внутри уверенно тёмных зданий.
# Запуск: python3 scripts/city-variants.py (нужны pillow, numpy, scipy)
import os, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

D = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'img') + '/'
src = Image.open(D + 'city.webp').convert('RGB')
src = src.crop((26, 26, src.width - 26, src.height - 26))
a = np.asarray(src).astype(np.float32) / 255
L = 0.3 * a[..., 0] + 0.59 * a[..., 1] + 0.11 * a[..., 2]
H, W = L.shape
yy = np.linspace(0, 1, H)[:, None]


def ramp(Lm, stops):
    xs = [s[0] for s in stops]
    return np.dstack([np.interp(Lm, xs, [s[1][c] / 255 for s in stops]) for c in range(3)])


def windows(img, density, cols, seed):
    sat = a.max(-1) - a.min(-1)
    bld = (L < 0.5) & (sat > 0.16)
    bld = ndimage.binary_opening(bld, iterations=2)
    bld = ndimage.binary_erosion(bld, iterations=5)  # окна только в глубине стен, не на краях
    glow = Image.new('RGB', (W, H))
    d = ImageDraw.Draw(glow)
    random.seed(seed)
    ys, xs = np.nonzero(bld)
    for _ in range(int(W * H * density / 40)):
        k = random.randrange(len(xs))
        x = int(xs[k]) // 9 * 9
        y = int(ys[k]) // 12 * 12
        d.rectangle((x, y, x + 3, y + 5), fill=random.choice(cols))
    arr = np.asarray(img).astype(np.float32)
    arr += np.asarray(glow.filter(ImageFilter.GaussianBlur(4))).astype(np.float32) * 0.8
    arr += np.asarray(glow).astype(np.float32) * 0.7
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


def save(img, name):
    img.save(D + f'city-{name}.webp', 'WEBP', quality=78, method=6)
    img.resize((900, int(900 * H / W)), Image.LANCZOS).save(D + f'city-{name}-xs.webp', 'WEBP', quality=68, method=6)


# ночь: тёмные — глубокий синий, светлые (облака) — лунно-лавандовые; сверху темнее
night = ramp(L, [(0, (5, 7, 26)), (0.35, (18, 22, 70)), (0.6, (44, 46, 120)), (0.82, (88, 86, 176)), (1, (140, 138, 222))])
night *= (0.42 + 0.58 * yy ** 0.8)[..., None]
night = night * 0.88 + a * np.array([0.05, 0.05, 0.12])  # чуть исходного цвета, чтобы не было «плоско»
img = Image.fromarray((np.clip(night, 0, 1) * 255).astype(np.uint8))
save(windows(img, 0.0034, [(255, 214, 140), (255, 214, 140), (255, 236, 200), (140, 190, 255), (200, 160, 255)], 4), 'night')

# вечер: мягкий закат, сиреневые дома, тёплое небо у горизонта
dusk = ramp(L, [(0, (40, 34, 96)), (0.4, (96, 84, 168)), (0.65, (170, 150, 220)), (0.85, (236, 206, 232)), (1, (255, 236, 236))])
dusk = dusk * 0.8 + a * 0.2
img = Image.fromarray((np.clip(dusk, 0, 1) * 255).astype(np.uint8))
save(windows(img, 0.0018, [(255, 226, 170), (255, 200, 220)], 5), 'dusk')
