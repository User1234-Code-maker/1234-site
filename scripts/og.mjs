// Картинки превью ссылок (1200×630) для страниц и проектов: npm run og
// Берёт заголовки из src/data/seo.json, кладёт файлы в public/og/.
import { chromium } from '@playwright/test'
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const seo = JSON.parse(readFileSync(path.join(root, 'src/data/seo.json'), 'utf8'))
const A = path.join(root, 'src/assets')
const outDir = path.join(root, 'public/og')
mkdirSync(outDir, { recursive: true })

const page = (o) => `<!doctype html><meta charset=utf-8><style>
@font-face{font-family:M;src:url(${A}/fonts/manrope-latin-800-normal.woff2);font-weight:800}
@font-face{font-family:M;src:url(${A}/fonts/manrope-latin-500-normal.woff2);font-weight:500}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:M,sans-serif;color:#fff;position:relative;background:#0b1030}
.bg{position:absolute;inset:0;background:url(${A}/img/city-night.webp) center/cover;opacity:.55}
.art{position:absolute;right:0;top:0;bottom:0;width:62%;background:url(${A}/img/${o.art}) ${o.square ? 'center/contain no-repeat' : 'left center/cover'};
 -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 30%)}
${o.square ? '.art{right:70px;top:95px;bottom:95px;width:440px;-webkit-mask-image:none;border-radius:28px;box-shadow:0 30px 80px #000c}' : ''}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,#0b1030 0,#0b1030f0 36%,#0b103000 64%)}
.t{position:absolute;left:70px;top:0;bottom:0;width:560px;display:flex;flex-direction:column;justify-content:center}
.k{display:inline-flex;align-self:flex-start;padding:8px 16px;border-radius:999px;background:#7c5cff;font-weight:800;font-size:20px;margin-bottom:24px}
h1{font-weight:800;font-size:62px;line-height:1.05;letter-spacing:-2px}
.by{position:absolute;left:70px;bottom:52px;display:flex;align-items:center;gap:12px;font-weight:500;font-size:22px;opacity:.85}
.by img{width:34px;image-rendering:pixelated}
</style><div class=bg></div><div class=art></div><div class=shade></div>
<div class=t><span class=k>${o.kicker}</span><h1>${o.headline}</h1></div>
<div class=by><img src="${A}/img/cat.png">Bogdan Korzun · fullstack developer</div>`

const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] })
const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
for (const [route, meta] of Object.entries(seo.pages)) {
  if (!meta.og) continue
  // страница из файла, иначе браузер не даст подгрузить локальные картинки и шрифты
  writeFileSync('/tmp/og-page.html', page(meta.og))
  await p.goto('file:///tmp/og-page.html', { waitUntil: 'load' })
  await p.waitForTimeout(300)
  const png = `/tmp/og-${path.basename(meta.image, '.jpg')}.png`
  await p.screenshot({ path: png })
  execFileSync('python3', [
    '-c',
    `from PIL import Image;Image.open('${png}').convert('RGB').save('${path.join(root, 'public', meta.image)}',quality=84,optimize=True,progressive=True)`,
  ])
  console.log('og', route)
}
await b.close()
