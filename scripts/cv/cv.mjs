// Резюме в PDF (русское и английское): npm run cv
// Текст — в этом файле, вёрстка — HTML ниже. PDF текстовый: его читают и люди, и системы отбора резюме (ATS).
import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const F = path.join(root, 'src/assets/fonts')
const site = 'https://user1234-code-maker.github.io/1234-site/'

const contacts = [
  ['bogdan.korzun2003@gmail.com', 'mailto:bogdan.korzun2003@gmail.com'],
  ['+7 924 118-13-24', 'tel:+79241181324'],
  ['+66 94 486 7814', 'tel:+66944867814'],
  ['t.me/OpalineDream', 'https://t.me/OpalineDream'],
  ['linkedin.com/in/bogdankorzun', 'https://www.linkedin.com/in/bogdankorzun/'],
  ['github.com/User1234-Code-maker', 'https://github.com/User1234-Code-maker'],
]

const cv = {
  ru: {
    file: 'Bogdan-Korzun-CV-RU.pdf',
    name: 'Богдан Корзун',
    role: 'Фуллстек-разработчик и системный аналитик',
    place: 'Хабаровск / Таиланд · готов к релокации и удалённой работе',
    siteLabel: 'Портфолио',
    h: {
      profile: 'Профиль',
      stack: 'Стек',
      exp: 'Опыт работы',
      projects: 'Открытые проекты',
      edu: 'Образование и языки',
      more: 'Ещё',
    },
    profile:
      'Делаю внутренние продукты музыкального лейбла от требований до продакшена: ERP, Telegram-боты и сервисы данных. Сам разговариваю с заказчиками, пишу постановку, проектирую решение и пишу код фронтенда и бэкенда. До разработки 3,5 года продавал IT- и AI-решения B2B-клиентам, поэтому понимаю, зачем бизнесу каждая фича, и умею объяснять техническое простыми словами.',
    stack: [
      ['Фронтенд', 'TypeScript, React 19, Vue 3, Vite, Tailwind 4, HeroUI, AG Grid Enterprise, HTML/CSS'],
      ['Бэкенд', 'Node.js, NestJS, Express, Telegraf (Telegram Bot API), REST, Stripe'],
      ['Данные', 'PostgreSQL, Prisma, Redis, ClickHouse, Google Sheets API'],
      ['Качество и выкладка', 'Vitest, Playwright, axe, GitHub Actions, Docker, Git, code review'],
      ['Анализ', 'BRD, user stories, API-спецификации, BPMN, Notion-документация'],
    ],
    jobs: [
      {
        title: 'Фуллстек-разработчик и системный аналитик',
        org: 'Zero to Infinity (музыкальный лейбл)',
        when: 'апрель 2025 — сейчас',
        did: [
          'ERP лейбла (React 19, AG Grid Enterprise, NestJS, Prisma, PostgreSQL): разделы дистрибуции, поддержки, документов и финансов.',
          'Довёл до продакшена сохранение настроек таблиц в разделах «Дистрибуция» и «Саппорт»: версии схемы, защита от одновременной записи, синхронизация между вкладками.',
          'Telegram-боты для дистрибуции, поддержки и оплат (Node.js, Telegraf, PostgreSQL, Redis, Docker): заявки, статусы, проверка согласований из Google Sheets перед выплатой.',
          'Внутренние сервисы: распознавание музыки в видео по ссылке со статистикой, исследование выплат промо-платформы Hitviro и её связки с ERP.',
          'Собираю требования, пишу BRD, user stories и API-спецификации, делаю code review, веду инструкции для команды в Notion.',
        ],
      },
      {
        title: 'Продажи IT- и AI-решений',
        org: 'Quantum Agency, Nomadic Soft, собственные проекты',
        when: 'октябрь 2022 — март 2026',
        did: [
          'Business Development Manager в Quantum Agency (июнь 2025 — март 2026) и IT Sales Manager в Nomadic Soft (январь 2024 — июнь 2025): пресейл, оценка проектов вместе с PM и разработкой, участие в составлении ТЗ.',
          'Закрывал сделки до 15 млн ₽ напрямую с собственниками бизнеса, проекты web, mobile и AI до 10 млн ₽.',
          'Собственные IT-проекты и консалтинг (2022–2025): собрал распределённую команду, автоматизировал продажи и отчётность скриптами и AI-инструментами.',
        ],
      },
    ],
    projects: [
      {
        name: 'Сайт-портфолио «1234»',
        link: site,
        text: 'Vue 3, TypeScript, Vite. Два языка, светлая и тёмная тема, свой плеер для музыки. 126 автотестов (Vitest, Playwright, axe), Lighthouse 95+ на компьютере, превью ссылок для каждой страницы.',
      },
      {
        name: 'Сайт игровой студии',
        link: 'https://game-studio-site.onrender.com',
        text: 'Начинал как вёрстку руками по макету из Figma. Теперь это React + TypeScript, Express API, PostgreSQL, тестовые оплаты Stripe, 3 языка. 166 автотестов в CI, 0 уязвимостей в зависимостях.',
      },
    ],
    edu: [
      'СПбУТУиЭ, лингвистика (переводчик), неоконченное высшее, 2022',
      'Английский B2 (Лингвамания, 2020) · японский, JLPT N5 (СПбГУ, 2024) · русский родной',
    ],
    more: 'Пишу и выпускаю свою музыку, был лидером рок-группы и звукорежиссёром. Водительские права категории B.',
  },
  en: {
    file: 'Bogdan-Korzun-CV-EN.pdf',
    name: 'Bogdan Korzun',
    role: 'Fullstack Developer and Systems Analyst',
    place: 'Khabarovsk / Thailand · open to relocation and remote work',
    siteLabel: 'Portfolio',
    h: {
      profile: 'Profile',
      stack: 'Stack',
      exp: 'Experience',
      projects: 'Open projects',
      edu: 'Education and languages',
      more: 'Also',
    },
    profile:
      'I build in-house products for a music label from requirements to production: an ERP, Telegram bots and data services. I talk to stakeholders, write the spec, design the solution and code both the front end and the back end. Before development I spent 3.5 years selling IT and AI solutions to B2B clients, so I understand why the business needs each feature and can explain technical things in plain words.',
    stack: [
      ['Front end', 'TypeScript, React 19, Vue 3, Vite, Tailwind 4, HeroUI, AG Grid Enterprise, HTML/CSS'],
      ['Back end', 'Node.js, NestJS, Express, Telegraf (Telegram Bot API), REST, Stripe'],
      ['Data', 'PostgreSQL, Prisma, Redis, ClickHouse, Google Sheets API'],
      ['Quality and delivery', 'Vitest, Playwright, axe, GitHub Actions, Docker, Git, code review'],
      ['Analysis', 'BRD, user stories, API specs, BPMN, Notion documentation'],
    ],
    jobs: [
      {
        title: 'Fullstack Developer and Systems Analyst',
        org: 'Zero to Infinity (music label)',
        when: 'April 2025 — present',
        did: [
          'The label’s ERP (React 19, AG Grid Enterprise, NestJS, Prisma, PostgreSQL): distribution, support, documents and finance sections.',
          'Shipped persistent table settings for the Distribution and Support sections to production: schema versions, protection against concurrent writes, sync between browser tabs.',
          'Telegram bots for distribution, support and payments (Node.js, Telegraf, PostgreSQL, Redis, Docker): requests, statuses, checking approvals from Google Sheets before a payout.',
          'In-house services: music recognition in videos by link with statistics; research of payouts on the Hitviro promo platform and its link with the ERP.',
          'I gather requirements, write BRDs, user stories and API specs, review code and keep team guides in Notion.',
        ],
      },
      {
        title: 'IT and AI solutions sales',
        org: 'Quantum Agency, Nomadic Soft, own projects',
        when: 'October 2022 — March 2026',
        did: [
          'Business Development Manager at Quantum Agency (June 2025 — March 2026) and IT Sales Manager at Nomadic Soft (January 2024 — June 2025): presales, project estimates with PMs and developers, help with specs.',
          'Closed deals up to 15 M RUB directly with business owners; web, mobile and AI projects up to 10 M RUB.',
          'Own IT projects and consulting (2022–2025): built a distributed team, automated sales and reporting with scripts and AI tools.',
        ],
      },
    ],
    projects: [
      {
        name: 'Portfolio site “1234”',
        link: site,
        text: 'Vue 3, TypeScript, Vite. Two languages, light and dark themes, a custom music player. 126 automated tests (Vitest, Playwright, axe), Lighthouse 95+ on desktop, link previews for every page.',
      },
      {
        name: 'Game Studio Website',
        link: 'https://game-studio-site.onrender.com',
        text: 'Started as a hand-coded layout from a Figma mockup. Now React + TypeScript, an Express API, PostgreSQL, Stripe test payments, 3 languages. 166 automated tests in CI, 0 vulnerable dependencies.',
      },
    ],
    edu: [
      'SPbUTUE, Linguistics (translator), incomplete higher education, 2022',
      'English B2 (Lingvamania, 2020) · Japanese, JLPT N5 (SPbSU, 2024) · Russian native',
    ],
    more: 'I write and release my own music; former rock band leader and sound engineer. Driver’s license (category B).',
  },
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const html = (
  c,
) => `<!doctype html><html lang="${c === cv.ru ? 'ru' : 'en'}"><meta charset="utf-8"><title>${c.name} — CV</title><style>
@font-face{font-family:M;src:url(${F}/manrope-cyrillic-400-normal.woff2);font-weight:400;unicode-range:U+0400-04FF}
@font-face{font-family:M;src:url(${F}/manrope-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:M;src:url(${F}/manrope-cyrillic-500-normal.woff2);font-weight:500 600;unicode-range:U+0400-04FF}
@font-face{font-family:M;src:url(${F}/manrope-latin-500-normal.woff2);font-weight:500 600}
@font-face{font-family:M;src:url(${F}/manrope-cyrillic-800-normal.woff2);font-weight:700 800;unicode-range:U+0400-04FF}
@font-face{font-family:M;src:url(${F}/manrope-latin-800-normal.woff2);font-weight:700 800}
@page{size:A4;margin:14mm 16mm}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:M,sans-serif;color:#1d2340;font-size:10.6pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
.page{padding:0}
header{display:grid;grid-template-columns:1fr auto;gap:0 6mm;align-items:center;padding-bottom:6mm;border-bottom:2px solid #1e2a6b}
h1{font-weight:800;font-size:27pt;letter-spacing:-.5pt;line-height:1.05;color:#1e2a6b}
.role,.place{grid-column:1/-1}
.role{font-weight:700;font-size:13pt;color:#6b5bd6;margin-top:2mm}
.place{color:#5a6187;margin-top:1.5mm;font-size:9.6pt}
.site{display:inline-block;background:#1e2a6b;color:#fff;font-weight:700;font-size:9.6pt;padding:2.2mm 4mm;border-radius:999px;white-space:nowrap}
.contacts{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:1.2mm 5mm;margin-top:4mm;font-size:9.4pt;color:#2c3460}
.contacts a{white-space:nowrap}
section{margin-top:6mm}
h2{break-after:avoid}
h2{font-weight:800;font-size:10pt;letter-spacing:.4pt;color:#6b5bd6;margin-bottom:2.5mm}
.lead{max-width:none}
.stack{display:grid;grid-template-columns:38mm 1fr;gap:1.4mm 4mm}
.stack b{font-weight:700}
.job{margin-bottom:4.5mm;break-inside:avoid}
.jh{display:flex;justify-content:space-between;gap:4mm;align-items:baseline}
.jh b{font-weight:800;font-size:11.2pt;color:#1e2a6b}
.jh span{color:#5a6187;font-size:9.6pt;white-space:nowrap}
.org{color:#434a80;font-weight:600;margin:.6mm 0 1.6mm}
ul{list-style:none}
li{position:relative;padding-left:4.5mm;margin-bottom:1.2mm}
li::before{content:"";position:absolute;left:0;top:2.2mm;width:1.6mm;height:1.6mm;border-radius:50%;background:#6b5bd6}
.prj{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.p{border:1px solid #d9ddf3;border-radius:3mm;padding:3.5mm 4mm;break-inside:avoid}
.p b{font-weight:800;color:#1e2a6b;display:block}
.p a{font-size:8.8pt;color:#6b5bd6;font-weight:600;display:block;margin:.4mm 0 1.4mm}
.p p{font-size:9.6pt}
.small{font-size:9.8pt}
</style><body><div class="page">
<header>
  <h1>${c.name}</h1>
  <a class="site" href="${site}">${c.siteLabel}: user1234-code-maker.github.io/1234-site</a>
  <div class="role">${c.role}</div><div class="place">${c.place}</div>
  <div class="contacts">${contacts.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</div>
</header>
<section><h2>${c.h.profile.toUpperCase()}</h2><p class="lead">${esc(c.profile)}</p></section>
<section><h2>${c.h.stack.toUpperCase()}</h2><div class="stack">${c.stack.map(([k, v]) => `<b>${k}</b><span>${v}</span>`).join('')}</div></section>
<section><h2>${c.h.exp.toUpperCase()}</h2>${c.jobs
  .map(
    (j) =>
      `<div class="job"><div class="jh"><b>${j.title}</b><span>${j.when}</span></div><div class="org">${j.org}</div><ul>${j.did.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></div>`,
  )
  .join('')}</section>
<section><h2>${c.h.projects.toUpperCase()}</h2><div class="prj">${c.projects
  .map(
    (p) =>
      `<div class="p"><b>${p.name}</b><a href="${p.link}">${p.link.replace('https://', '')}</a><p>${esc(p.text)}</p></div>`,
  )
  .join('')}</div></section>
<section><h2>${c.h.edu.toUpperCase()}</h2><ul class="small">${c.edu.map((e) => `<li>${e}</li>`).join('')}</ul></section>
<section><h2>${c.h.more.toUpperCase()}</h2><p class="small">${c.more}</p></section>
</div></body></html>`

const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] })
const p = await b.newPage()
for (const c of [cv.ru, cv.en]) {
  const tmp = `/tmp/${c.file}.html`
  writeFileSync(tmp, html(c))
  await p.goto('file://' + tmp, { waitUntil: 'load' })
  await p.pdf({
    path: path.join(root, 'public/cv', c.file),
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  })
  console.log('cv', c.file)
}
await b.close()
