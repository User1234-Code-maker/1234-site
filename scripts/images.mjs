// Готовит лёгкие версии картинок: npm run images
// 1) AVIF рядом с каждым webp тяжелее 20 КБ (тот же вид, файл на 30–70% легче; браузеры без AVIF берут webp)
// 2) уменьшенные копии -w800 для обложек и скриншотов (их показывают в карточках, где полный размер не нужен)
// 3) src/data/imgsizes.json — ширина каждой картинки для srcset
import sharp from 'sharp'
import { readdirSync, statSync, writeFileSync, existsSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'src/assets/img')
const force = process.argv.includes('--force')
const small =
  /^(cover-(portfolio|game-studio)|nda-(erp-dashboard|erp-app|erp-login|hitviro-campaigns|hitviro-app|bots-cover|music-comic)|shot-)/
const avif = (q) => ({ quality: q, effort: 5, chromaSubsampling: '4:4:4' })

const sizes = {}
for (const f of readdirSync(dir).sort()) {
  if (!f.endsWith('.webp') || f.includes('-w800')) continue
  const src = path.join(dir, f)
  const base = f.replace(/\.webp$/, '')
  const meta = await sharp(src).metadata()
  sizes[base] = meta.width
  const heavy = statSync(src).size > 20 * 1024
  if (heavy && (force || !existsSync(path.join(dir, base + '.avif')))) {
    const out = path.join(dir, base + '.avif')
    await sharp(src).avif(avif(60)).toFile(out)
    // для «живописных» картинок (город) AVIF почти не выигрывает: такие не оставляем
    if (statSync(out).size > statSync(src).size * 0.85) unlinkSync(out)
    else console.log('avif', base)
  }
  if (small.test(base) && meta.width > 1000) {
    sizes[base + '-w800'] = 800
    const w = path.join(dir, base + '-w800')
    if (force || !existsSync(w + '.webp')) {
      await sharp(src)
        .resize(800)
        .webp({ quality: 80 })
        .toFile(w + '.webp')
      await sharp(src)
        .resize(800)
        .avif(avif(58))
        .toFile(w + '.avif')
      if (statSync(w + '.avif').size > statSync(w + '.webp').size * 0.85) unlinkSync(w + '.avif')
      console.log('w800', base)
    }
  }
}
writeFileSync(path.join(root, 'src/data/imgsizes.json'), JSON.stringify(sizes, null, 1) + '\n')
