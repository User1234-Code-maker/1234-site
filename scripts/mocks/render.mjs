// Рендер макетов в webp: node scripts/mocks/render.mjs [имя ...]
import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const dir = path.dirname(fileURLToPath(import.meta.url))
const out = path.resolve(dir, '../../src/assets/img')
const jobs = {
  'erp-dashboard': [1440, 900, 1],
  'erp-login': [1440, 900, 1],
  'hitviro-campaigns': [1440, 900, 1],
  'bots-menu': [390, 844, 1.6],
  'bots-radar': [390, 844, 1.6],
  'bots-review': [390, 844, 1.6],
  'music-comic': [1440, 900, 1],
}
const only = process.argv.slice(2)
const b = await chromium.launch({
  executablePath: process.env.CHROME || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
})
for (const [name, [w, h, dpr]] of Object.entries(jobs)) {
  if (only.length && !only.includes(name)) continue
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr })
  await p.goto('file://' + path.join(dir, name + '.html'))
  await p.waitForTimeout(400)
  const png = `/tmp/mock-${name}.png`
  await p.screenshot({ path: png })
  execFileSync('python3', [
    '-c',
    `from PIL import Image;Image.open('${png}').convert('RGB').save('${out}/nda-${name}.webp',quality=80,method=6)`,
  ])
  console.log('ok', name)
  await p.close()
}
await b.close()
