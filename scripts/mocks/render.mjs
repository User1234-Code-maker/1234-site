// Рендер макетов NDA-проектов в webp: npm run mocks [имя ...]
// Экраны ботов рендерятся дважды: «голый» экран и он же в рамке телефона (с прозрачным фоном).
import { chromium } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const dir = path.dirname(fileURLToPath(import.meta.url))
const out = path.resolve(dir, '../../src/assets/img')
const webp = (png, name, q = 80) =>
  execFileSync('python3', [
    '-c',
    `from PIL import Image;im=Image.open('${png}');im=im if im.mode=='RGBA' else im.convert('RGB');im.save('${out}/nda-${name}.webp',quality=${q},method=6)`,
  ])
const only = process.argv.slice(2)
const want = (n) => !only.length || only.includes(n)
const b = await chromium.launch({
  executablePath: process.env.CHROME || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
})
const shot = async (file, w, h, dpr, png, transparent = false) => {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr })
  await p.goto('file://' + path.join(dir, file))
  await p.waitForTimeout(600)
  await p.screenshot({ path: png, omitBackground: transparent })
  await p.close()
}
for (const n of ['erp-dashboard', 'erp-login', 'hitviro-campaigns', 'music-comic']) {
  if (!want(n)) continue
  await shot(`${n}.html`, 1600, 1000, 1.25, `/tmp/mock-${n}.png`)
  webp(`/tmp/mock-${n}.png`, n)
  console.log('ok', n)
}
// плоские экраны для раздела «Экраны»
for (const n of ['erp-app', 'hitviro-app']) {
  if (!want(n)) continue
  await shot(`${n}.html`, 1240, 780, 1.4, `/tmp/mock-${n}.png`)
  webp(`/tmp/mock-${n}.png`, n)
  console.log('ok', n)
}
if (want('bots')) {
  for (const n of ['menu', 'radar', 'review']) {
    await shot(`bots-${n}.html`, 402, 872, 2, `/tmp/raw-${n}.png`)
    await shot(`frame.html?s=file:///tmp/raw-${n}.png`, 470, 940, 1.5, `/tmp/framed-${n}.png`, true)
    webp(`/tmp/framed-${n}.png`, `bots-${n}`, 82)
  }
  await shot('bots-cover.html', 1600, 1000, 1.25, '/tmp/mock-bots-cover.png')
  webp('/tmp/mock-bots-cover.png', 'bots-cover')
  console.log('ok bots')
}
await b.close()
