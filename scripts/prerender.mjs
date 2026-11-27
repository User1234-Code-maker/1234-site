// После сборки: у каждой страницы свой HTML со своим заголовком, описанием и картинкой превью.
// Мессенджеры и соцсети (Telegram, LinkedIn) не запускают JavaScript и видят только эти теги.
// Ещё здесь собираются sitemap.xml и robots.txt — адрес сайта берётся из src/data/seo.json (одно место для домена).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const seo = JSON.parse(readFileSync(path.join(root, 'src/data/seo.json'), 'utf8'))
const { pages } = seo
// свой домен задаётся при сборке (SITE_URL), иначе адрес на github.io из seo.json
const site = (process.env.SITE_URL || seo.site).replace(/\/$/, '')
let base = readFileSync(path.join(dist, 'index.html'), 'utf8')

// Политика безопасности (CSP): страница может грузить скрипты только с этого сайта и наш встроенный скрипт
// (разрешён по его отпечатку). Счётчик GoatCounter добавляется, только если он включён.
const inline = [...base.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  (m) => `'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`,
)
const gc = process.env.VITE_GOATCOUNTER ? ' https://gc.zgo.at' : ''
const gcConn = process.env.VITE_GOATCOUNTER ? ` https://${process.env.VITE_GOATCOUNTER}.goatcounter.com` : ''
const csp = [
  "default-src 'self'",
  `script-src 'self' ${inline.join(' ')}${gc}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data:${gcConn}`,
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self'${gcConn}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')
base = base.replace(
  '<meta charset="utf-8" />',
  `<meta charset="utf-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`,
)
if (!base.includes('Content-Security-Policy')) throw new Error('CSP не добавилась')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const tag = (re, html, value) => {
  if (!re.test(html)) throw new Error('в index.html нет тега ' + re)
  return html.replace(re, value)
}

// Разметка schema.org о человеке: по ней Google понимает, кто это, кем работает и где резюме
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Bogdan Korzun',
  alternateName: 'Богдан Корзун',
  jobTitle: 'Fullstack Developer / Systems Analyst',
  worksFor: { '@type': 'Organization', name: 'Zero to Infinity' },
  url: `${site}/`,
  image: `${site}/og.jpg`,
  knowsAbout: [
    'TypeScript',
    'React',
    'Vue',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Telegram bots',
    'ERP',
    'Systems analysis',
  ],
  knowsLanguage: ['ru', 'en', 'ja'],
  sameAs: [
    'https://github.com/User1234-Code-maker',
    'https://www.linkedin.com/in/bogdankorzun/',
    'https://t.me/OpalineDream',
    'https://soundcloud.com/user1234user1234user1234',
  ],
  subjectOf: [
    {
      '@type': 'DigitalDocument',
      name: 'CV (English)',
      encodingFormat: 'application/pdf',
      url: `${site}/cv/Bogdan-Korzun-CV-EN.pdf`,
      inLanguage: 'en',
    },
    {
      '@type': 'DigitalDocument',
      name: 'Резюме (русский)',
      encodingFormat: 'application/pdf',
      url: `${site}/cv/Bogdan-Korzun-CV-RU.pdf`,
      inLanguage: 'ru',
    },
  ],
}
const personTag = `    <script type="application/ld+json">${JSON.stringify(person)}</script>\n`

function render(route, meta) {
  const url = `${site}/${route}`
  const image = `${site}/${meta.image}`
  let h = base
  h = tag(/<title>[^<]*<\/title>/, h, `<title>${esc(meta.title)}</title>`)
  h = tag(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    h,
    `<meta name="description" content="${esc(meta.description)}" />`,
  )
  h = tag(
    /<meta property="og:title" content="[^"]*" \/>/,
    h,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
  )
  h = tag(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    h,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
  )
  h = tag(/<meta property="og:url" content="[^"]*" \/>/, h, `<meta property="og:url" content="${url}" />`)
  h = tag(
    /<meta property="og:image" content="[^"]*" \/>/,
    h,
    `<meta property="og:image" content="${image}" />`,
  )
  h = h.replace(
    '</head>',
    `    <link rel="canonical" href="${url}" />\n${route === '' || route === 'about' ? personTag : ''}  </head>`,
  )
  return h
}

// главная, затем каждая страница: /about → about.html, /projects → projects/index.html,
// /projects/x → projects/x.html (GitHub Pages сам находит .html по адресу без расширения)
for (const [route, meta] of Object.entries(pages)) {
  const file = route === '' ? 'index.html' : route === 'projects' ? 'projects/index.html' : `${route}.html`
  const out = path.join(dist, file)
  mkdirSync(path.dirname(out), { recursive: true })
  writeFileSync(out, render(route, meta))
}
// неизвестный адрес: та же страница-приложение, но без индексации
writeFileSync(
  path.join(dist, '404.html'),
  base.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>'),
)

const today = new Date().toISOString().slice(0, 10)
const urls = Object.keys(pages)
  .map((r) => `  <url><loc>${site}/${r}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')
// резюме тоже в карте сайта: так поисковики быстрее находят и индексируют PDF
const cvs = ['Bogdan-Korzun-CV-EN.pdf', 'Bogdan-Korzun-CV-RU.pdf']
  .map((f) => `  <url><loc>${site}/cv/${f}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')
writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n${cvs}\n</urlset>\n`,
)
writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
// GitHub Pages узнаёт свой домен из файла CNAME
if (process.env.CUSTOM_DOMAIN) writeFileSync(path.join(dist, 'CNAME'), process.env.CUSTOM_DOMAIN + '\n')
console.log(`prerender: ${Object.keys(pages).length} страниц`)
