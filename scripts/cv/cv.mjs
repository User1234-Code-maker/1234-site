// Резюме в PDF (русское и английское): npm run cv
// Классический формат, который хорошо читают и люди, и системы отбора (ATS): текстовый PDF,
// разделы с линиями, «Обязанности / Достижения». Шрифты Source Serif 4 и Source Sans 3 (лицензия OFL) лежат в ./fonts.
import { chromium } from '@playwright/test'
import { readFileSync, writeFileSync } from 'node:fs'
import { PDFDocument } from 'pdf-lib'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')
const F = path.join(here, 'fonts')
const site = 'https://user1234-code-maker.github.io/1234-site/'

const links = {
  email: ['bogdan.korzun2003@gmail.com', 'mailto:bogdan.korzun2003@gmail.com'],
  tg: ['@OpalineDream', 'https://t.me/OpalineDream'],
  li: ['linkedin.com/in/bogdankorzun', 'https://www.linkedin.com/in/bogdankorzun/'],
  gh: ['github.com/User1234-Code-maker', 'https://github.com/User1234-Code-maker'],
  site: ['user1234-code-maker.github.io/1234-site', site],
}

const cv = {
  en: {
    file: 'Bogdan-Korzun-CV-EN.pdf',
    lang: 'en',
    meta: {
      title: 'Bogdan Korzun — Fullstack Developer (React, Node.js, TypeScript) / Systems Analyst — CV',
      subject:
        'CV: Fullstack developer and systems analyst. React, Vue, Node.js, NestJS, PostgreSQL, Telegram bots, ERP. Remote or relocation.',
      keywords: [
        ...[
          'Fullstack',
          'Full-stack',
          'Frontend',
          'Backend',
          'TypeScript',
          'JavaScript',
          'React',
          'Vue',
          'Node.js',
          'NestJS',
          'Express',
          'PostgreSQL',
          'Prisma',
          'Redis',
          'Telegram Bot API',
          'REST API',
          'ERP',
          'AG Grid',
          'Playwright',
          'Docker',
        ],
        'Systems Analyst',
        'Business Analyst',
        'CV',
        'Resume',
        'Remote',
      ],
    },
    name: 'Bogdan Korzun',
    title: 'Fullstack Developer / Systems Analyst',
    tagline: 'TypeScript · React · Vue · Node.js · NestJS · PostgreSQL · Telegram Bots · ERP',
    phones: '+7 (924) 118-13-24',
    place: 'Khabarovsk / Thailand · open to relocation and remote work',
    l: { tg: 'Telegram', site: 'Portfolio', gh: 'GitHub', li: 'LinkedIn' },
    h: {
      profile: 'Profile',
      key: 'Key achievements',
      skills: 'Technical skills',
      exp: 'Work experience',
      edu: 'Education, languages and more',
      resp: 'Responsibilities:',
      ach: 'Achievements:',
    },
    profile:
      'Fullstack developer and systems analyst. I build internal business products end to end — ERP systems, Telegram bots and data services: from gathering requirements and writing specs to the front end, back end, database and release. Main stack: TypeScript, React, Vue, Node.js, NestJS, PostgreSQL. Before moving fully into development I spent 3.5+ years in B2B IT/AI sales and pre-sale, so I understand why the business needs each feature and speak the language of both owners and developers.',
    key: [
      'Shipped persistent table state for the ERP Distribution and Support sections to production: schema versions, optimistic concurrency, sync between browser tabs',
      'Built and run Telegram bots for distribution, support and payments (Node.js, Telegraf, PostgreSQL, Redis, Docker) used by the team daily',
      'Delivered several rounds of ERP UI/UX work in React 19 and AG Grid Enterprise: fixed systemic layout bugs, unified components, made screens responsive',
      'Built an in-house service that recognises music in videos by link and collects statistics for videos and releases',
      'Wrote BRDs, user stories, API specs and Notion user guides for ERP sections and bots',
    ],
    skills: [
      ['Languages', 'TypeScript · JavaScript · SQL · HTML · CSS'],
      [
        'Frontend',
        'React 19 · Vue 3 · Vite · Tailwind v4 · HeroUI · AG Grid Enterprise · responsive layout · accessibility (axe)',
      ],
      [
        'Backend',
        'Node.js · NestJS · Express · REST APIs · Telegraf / Telegram Bot API · Stripe · Google Sheets API',
      ],
      ['Data', 'PostgreSQL · Prisma · Redis · ClickHouse'],
      ['Testing and delivery', 'Vitest · Playwright · GitHub Actions · Docker · Git · code review'],
      [
        'Systems analysis',
        'BRD · user stories · API specs · BPMN · business process design · Notion documentation',
      ],
      ['Tools', 'Cursor · Figma · Notion · Bitrix24 · 1C · MS Excel · Logic Pro X'],
    ],
    zero: {
      title: 'Fullstack Developer / Systems Analyst',
      org: 'Zero to Infinity (music label)',
      when: 'Apr 2025 — Present',
      resp: [
        'Developing ERP modules: React 19, AG Grid Enterprise, HeroUI, Tailwind v4 on the front end; NestJS, Prisma, PostgreSQL on the back end',
        'Building and maintaining Telegram bots for distribution, support and payments (Node.js, Telegraf, PostgreSQL, Redis, Docker)',
        'In-house services: music recognition in videos by link with statistics; integrations with Google Sheets',
        'Gathering requirements from stakeholders and turning them into BRDs, user stories and API specifications',
        'Designing business processes and system workflows; planning features, testing and preparing releases',
        'Code review and day-to-day work with the development team; troubleshooting production issues',
      ],
      ach: [
        'Delivered the full lifecycle of the ERP table-state persistence feature: architecture (revision / schema_version, optimistic concurrency, cross-tab sync), task breakdown, production release',
        'Added approval checks to the payments bot so payouts are created only for approved requests',
        'Researched payouts on the Hitviro promo platform and its integration with the ERP',
        'Produced Notion user guides for ERP sections and the related Telegram bots',
      ],
    },
    earlier: [
      {
        title: 'Business Development Manager (IT / AI Solutions)',
        org: 'Quantum Agency · quantum-dev.ru',
        when: 'Jun 2025 — Mar 2026',
        resp: [
          'Pre-sale scoping and estimation of web, mobile and AI projects together with the PM and developers',
          'Writing requirement specs and technical briefs for incoming projects',
          'Presenting IT products and AI solutions to business owners and decision-makers; outsourcing and outstaffing services',
          'Running the full deal cycle from first contact to contract; working with KPIs, sales funnel analytics and documentation',
          'Building a B2B lead-generation process',
        ],
        ach: [
          'Closed deals up to 15M RUB directly with business owners',
          'Shortened the deal cycle through accurate pre-sale scoping with the dev team',
          'Built a systematic outbound process with a stable lead flow',
          'Expanded the line of services sold: IT development, AI, outsourcing / outstaffing',
        ],
      },
      {
        title: 'IT Sales Manager (B2B/B2C, project-based solutions)',
        org: 'Nomadic Soft · nomadicsoft.io',
        when: 'Jan 2024 — Jun 2025',
        resp: [
          'Requirements gathering, pre-sale and project scoping for web, mobile and AI projects',
          'Preparing commercial proposals and technical specifications together with the development team',
          'Coordinating with developers and project managers during estimation and handover',
          'Using AI tools for lead generation and sales analytics',
          'Selling outsourced and outstaffed development teams',
        ],
        ach: [
          'Closed web / mobile / AI projects up to 10M RUB',
          'Improved the quality of proposals and specs, which raised proposal-to-deal conversion',
        ],
      },
      {
        title: 'Founder & Independent IT Consultant',
        org: 'Self-employed / freelance · Moscow',
        when: 'Oct 2022 — Jun 2025',
        resp: [
          'Running own IT and digital projects (B2C) from idea to delivery',
          'Writing scripts and introducing AI tools to automate sales, reporting and analytics',
          'Hiring and managing a distributed team of contractors',
          'Setting up operational processes: sales, delivery and quality control',
          'Finding clients and contractors on freelance platforms',
        ],
        ach: [
          'Launched and scaled own IT projects without external funding',
          'Cut operational costs through automation and AI tools',
          'Set up the sales process from scratch: structure, KPIs, scripts and funnel',
        ],
      },
      {
        title: 'Retail Sales Associate',
        org: 'Inventive Retail Group · inventive.ru',
        when: 'Oct 2023 — Jan 2025',
        resp: [
          'Processing sales and orders in 1C and helping set up basic document flow',
          'Consulting customers on electronics, upsell and cross-sell',
          'Tracking personal and team KPIs; mentoring and onboarding new staff',
        ],
        ach: [
          'Consistently met and exceeded sales targets',
          'Grew the average ticket through upsell and cross-sell',
        ],
      },
    ],
    edu: [
      ['SPbUTUE — Linguistics, Translator / Interpreter (incomplete higher education)', '2022'],
      ['JLPT N5 — Japanese Language Proficiency Test (SPbSU)', '2024'],
      ['English B2 — Lingvamania Language School', '2020'],
    ],
    langs: 'Languages: Russian (native) · English B2 · Japanese (JLPT N5)',
    about:
      'Also: driver’s license (category B); I write and release my own music, used to lead a rock band and work as a sound engineer.',
  },
  ru: {
    file: 'Bogdan-Korzun-CV-RU.pdf',
    lang: 'ru',
    meta: {
      title:
        'Богдан Корзун — Fullstack-разработчик (React, Node.js, TypeScript) / Системный аналитик — резюме',
      subject:
        'Резюме: Fullstack-разработчик и системный аналитик. React, Vue, Node.js, NestJS, PostgreSQL, Telegram-боты, ERP. Удалённо или релокация.',
      keywords: [
        ...[
          'Fullstack',
          'Full-stack',
          'Frontend',
          'Backend',
          'TypeScript',
          'JavaScript',
          'React',
          'Vue',
          'Node.js',
          'NestJS',
          'Express',
          'PostgreSQL',
          'Prisma',
          'Redis',
          'Telegram Bot API',
          'REST API',
          'ERP',
          'AG Grid',
          'Playwright',
          'Docker',
        ],
        'Фуллстек',
        'Фронтенд',
        'Бэкенд',
        'Системный аналитик',
        'Бизнес-аналитик',
        'Разработчик',
        'Резюме',
        'Удалённая работа',
      ],
    },
    name: 'Богдан Корзун',
    title: 'Fullstack-разработчик / Системный аналитик',
    tagline: 'TypeScript · React · Vue · Node.js · NestJS · PostgreSQL · Telegram-боты · ERP',
    phones: '+7 (924) 118-13-24',
    place: 'Хабаровск / Таиланд · готов к релокации и удалённой работе',
    l: { tg: 'Telegram', site: 'Портфолио', gh: 'GitHub', li: 'LinkedIn' },
    h: {
      profile: 'Профиль',
      key: 'Ключевые достижения',
      skills: 'Технические навыки',
      exp: 'Опыт работы',
      edu: 'Образование, языки и прочее',
      resp: 'Обязанности:',
      ach: 'Достижения:',
    },
    profile:
      'Fullstack-разработчик и системный аналитик. Делаю внутренние продукты для бизнеса целиком — ERP-системы, Telegram-боты и сервисы данных: от сбора требований и постановки задач до фронтенда, бэкенда, базы данных и релиза. Основной стек: TypeScript, React, Vue, Node.js, NestJS, PostgreSQL. До перехода в разработку 3,5+ года работал в B2B-продажах и пресейле IT/AI-решений, поэтому понимаю, зачем бизнесу каждая фича, и говорю на одном языке и с собственниками, и с разработчиками.',
    key: [
      'Довёл до продакшена сохранение состояния таблиц в разделах ERP «Дистрибуция» и «Саппорт»: версии схемы, оптимистичная блокировка, синхронизация между вкладками',
      'Сделал и поддерживаю Telegram-боты для дистрибуции, поддержки и оплат (Node.js, Telegraf, PostgreSQL, Redis, Docker), которыми команда пользуется каждый день',
      'Провёл несколько раундов UI/UX-доработок ERP на React 19 и AG Grid Enterprise: убрал системные баги вёрстки, унифицировал компоненты, сделал экраны адаптивными',
      'Сделал внутренний сервис, который распознаёт музыку в видео по ссылке и собирает статистику по роликам и релизам',
      'Подготовил BRD, user stories, API-спецификации и инструкции в Notion для разделов ERP и ботов',
    ],
    skills: [
      ['Языки', 'TypeScript · JavaScript · SQL · HTML · CSS'],
      [
        'Frontend',
        'React 19 · Vue 3 · Vite · Tailwind v4 · HeroUI · AG Grid Enterprise · адаптивная вёрстка · доступность (axe)',
      ],
      [
        'Backend',
        'Node.js · NestJS · Express · REST API · Telegraf / Telegram Bot API · Stripe · Google Sheets API',
      ],
      ['Данные', 'PostgreSQL · Prisma · Redis · ClickHouse'],
      ['Тесты и выкладка', 'Vitest · Playwright · GitHub Actions · Docker · Git · code review'],
      [
        'Системный анализ',
        'BRD · user stories · API-спецификации · BPMN · проектирование процессов · документация в Notion',
      ],
      ['Инструменты', 'Cursor · Figma · Notion · Bitrix24 · 1С · MS Excel · Logic Pro X'],
    ],
    zero: {
      title: 'Fullstack-разработчик / Системный аналитик',
      org: 'Zero to Infinity (музыкальный лейбл)',
      when: 'апрель 2025 — сейчас',
      resp: [
        'Разработка модулей ERP: React 19, AG Grid Enterprise, HeroUI, Tailwind v4 на фронтенде; NestJS, Prisma, PostgreSQL на бэкенде',
        'Разработка и поддержка Telegram-ботов для дистрибуции, поддержки и оплат (Node.js, Telegraf, PostgreSQL, Redis, Docker)',
        'Внутренние сервисы: распознавание музыки в видео по ссылке со статистикой; интеграции с Google Sheets',
        'Сбор требований у заказчиков и оформление их в BRD, user stories и API-спецификации',
        'Проектирование бизнес-процессов и workflow, планирование, тестирование и подготовка релизов',
        'Code review и разбор проблем в продакшене',
      ],
      ach: [
        'Прошёл полный цикл фичи сохранения состояния таблиц ERP: архитектура (revision / schema_version, оптимистичная блокировка, синхронизация между вкладками), постановка задач, продакшен-релиз',
        'Добавил в бот оплат проверку согласований: выплата создаётся только по одобренной заявке',
        'Исследовал выплаты промо-платформы Hitviro и её интеграцию с ERP',
        'Подготовил базы инструкций в Notion для разделов ERP и связанных ботов',
      ],
    },
    earlier: [
      {
        title: 'Business Development Manager (IT / AI Solutions)',
        org: 'Quantum Agency · quantum-dev.ru',
        when: 'июнь 2025 — март 2026',
        resp: [
          'Пресейл-оценка web-, mobile- и AI-проектов вместе с PM и разработчиками',
          'Подготовка требований и технических брифов по входящим проектам',
          'Презентации IT-продуктов и AI-решений собственникам и ЛПР; аутсорс и аутстафф',
          'Ведение сделки от первого контакта до договора; KPI, аналитика воронки и документация',
          'Построение процесса B2B-лидогенерации',
        ],
        ach: [
          'Закрывал сделки до 15 млн ₽ напрямую с собственниками бизнеса',
          'Сократил цикл сделки за счёт точной пресейл-оценки с командой разработки',
          'Выстроил системные холодные продажи со стабильным потоком лидов',
          'Расширил линейку продаваемых услуг: разработка, AI, аутсорс / аутстафф',
        ],
      },
      {
        title: 'IT Sales Manager (B2B/B2C, проектные продажи)',
        org: 'Nomadic Soft · nomadicsoft.io',
        when: 'январь 2024 — июнь 2025',
        resp: [
          'Сбор требований, пресейл и оценка web-, mobile- и AI-проектов',
          'Подготовка КП и технических заданий вместе с командой разработки',
          'Координация с разработчиками и PM при оценке и передаче проекта в работу',
          'AI-инструменты для лидогенерации и аналитики продаж',
          'Продажа аутсорс- и аутстафф-команд',
        ],
        ach: [
          'Закрывал проекты web / mobile / AI до 10 млн ₽',
          'Повысил качество КП и ТЗ — выросла конверсия из КП в сделку',
        ],
      },
      {
        title: 'Основатель и независимый IT-консультант',
        org: 'ИП / фриланс · Москва',
        when: 'октябрь 2022 — июнь 2025',
        resp: [
          'Вёл собственные IT- и digital-проекты (B2C) от идеи до сдачи',
          'Писал скрипты и внедрял AI-инструменты для автоматизации продаж, отчётности и аналитики',
          'Нанимал распределённую команду подрядчиков и управлял ею',
          'Выстраивал процессы: продажи, производство и контроль качества',
          'Искал клиентов и исполнителей на фриланс-площадках',
        ],
        ach: [
          'Запустил и масштабировал собственные IT-проекты без внешних инвестиций',
          'Снизил операционные расходы за счёт автоматизации и AI',
          'С нуля выстроил продажи: структура, KPI, скрипты и воронка',
        ],
      },
      {
        title: 'Продавец-консультант',
        org: 'Inventive Retail Group · inventive.ru',
        when: 'октябрь 2023 — январь 2025',
        resp: [
          'Оформление продаж и заказов в 1С, помощь в настройке базового документооборота',
          'Консультирование покупателей по технике, допродажи (upsell, cross-sell)',
          'Личные и командные KPI; наставничество и адаптация новых сотрудников',
        ],
        ach: ['Стабильно выполнял и перевыполнял планы продаж', 'Увеличил средний чек за счёт допродаж'],
      },
    ],
    edu: [
      ['СПбУТУиЭ — лингвистика, переводчик (неоконченное высшее)', '2022'],
      ['JLPT N5 — международный сертификат по японскому языку (СПбГУ)', '2024'],
      ['Английский B2 — школа «Лингвамания»', '2020'],
    ],
    langs: 'Языки: русский (родной) · английский B2 · японский (JLPT N5)',
    about:
      'Ещё: водительские права категории B; пишу и выпускаю свою музыку, был лидером рок-группы и звукорежиссёром.',
  },
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const a = ([t, h]) => `<a href="${h}">${esc(t)}</a>`
const ul = (items, cls = '') => `<ul class="${cls}">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`

const font = (fam, file, w, style = 'normal', cyr = false) =>
  `@font-face{font-family:${fam};src:url(${F}/${file}.woff2);font-weight:${w};font-style:${style}${cyr ? ';unicode-range:U+0400-04FF' : ''}}`
const fonts = [
  ...['400', '600', '700'].flatMap((w) => [
    font('S', `source-serif-4-latin-${w}-normal`, w),
    font('S', `source-serif-4-cyrillic-${w}-normal`, w, 'normal', true),
  ]),
  font('S', 'source-serif-4-latin-400-italic', 400, 'italic'),
  font('S', 'source-serif-4-cyrillic-400-italic', 400, 'italic', true),
  ...['600', '700'].flatMap((w) => [
    font('H', `source-sans-3-latin-${w}-normal`, w),
    font('H', `source-sans-3-cyrillic-${w}-normal`, w, 'normal', true),
  ]),
].join('\n')

const html = (
  c,
) => `<!doctype html><html lang="${c.lang}"><meta charset="utf-8"><title>${c.name} — CV</title><style>
${fonts}
@page{size:A4;margin:13mm 15mm 13mm}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:S,serif;color:#1b1f2a;font-size:10pt;line-height:1.34;-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
h1{font-family:H,sans-serif;font-weight:700;font-size:25pt;color:#1f4e8c;line-height:1.05}
.title{font-weight:700;font-size:12.2pt;margin-top:1.6mm}
.tag{font-style:italic;color:#4a5263;margin-top:.6mm}
.contacts{margin-top:2.6mm;font-size:9.4pt;color:#2b3242;line-height:1.55}
.contacts span+span::before{content:" · ";color:#8a93a6}
.contacts b{font-weight:600;color:#1f4e8c}
.top{padding-bottom:3.2mm;border-bottom:1.4pt solid #1f4e8c}
h2{font-family:H,sans-serif;font-weight:700;font-size:10.6pt;letter-spacing:0;text-transform:uppercase;color:#1f4e8c;
 margin:4.4mm 0 1.9mm;padding-bottom:1mm;border-bottom:.6pt solid #c9d3e6;break-after:avoid}
p{text-align:left}
ul{list-style:none}
li{position:relative;padding-left:4.2mm;margin:.7mm 0}
li::before{content:"•";position:absolute;left:.8mm;color:#1f4e8c;font-weight:700}
ul.ok li::before{content:"✓";left:0;color:#1d8a4e;font-family:H,sans-serif}
.skills{display:grid;grid-template-columns:34mm 1fr;gap:1.1mm 3mm}
.skills b{font-family:H,sans-serif;font-weight:700;font-size:9.8pt;color:#1b1f2a}
.job,.prj{margin-bottom:3.2mm;break-inside:avoid}
.job.main{break-inside:auto}
li{break-inside:avoid}
.jh{display:flex;justify-content:space-between;align-items:baseline;gap:4mm}
.jh b{font-family:H,sans-serif;font-weight:700;font-size:11pt}
.jh span{font-size:9.4pt;color:#4a5263;white-space:nowrap}
.org{font-style:italic;color:#4a5263;margin:.3mm 0 1.2mm}
.lbl{font-family:H,sans-serif;font-weight:700;font-size:9.6pt;margin-top:1.4mm}
.pl{font-size:9.4pt;color:#1f4e8c;font-weight:600}
.pl a+a::before{content:" · ";color:#8a93a6}
.st{font-size:9.6pt;color:#4a5263;margin:.4mm 0 .6mm}
.st i{font-style:normal;font-weight:600;color:#1b1f2a}
.early .job{margin-bottom:2.4mm}
.early p{font-size:9.8pt}
.edu div{display:flex;justify-content:space-between;gap:4mm;margin:.6mm 0}
.edu span{color:#4a5263;white-space:nowrap}
</style><body>
<div class="top">
  <h1>${c.name}</h1>
  <div class="title">${c.title}</div>
  <div class="tag">${c.tagline}</div>
  <div class="contacts">
    <span>${a(links.email)}</span><span>${c.phones}</span><span>${c.l.tg}: ${a(links.tg)}</span><br>
    <span><b>${c.l.site}:</b> ${a(links.site)}</span><span>${a(links.gh)}</span><br>
    <span>${a(links.li)}</span><span>${c.place}</span>
  </div>
</div>
<h2>${c.h.profile}</h2><p>${esc(c.profile)}</p>
<h2>${c.h.key}</h2>${ul(c.key, 'ok')}
<h2>${c.h.skills}</h2><div class="skills">${c.skills.map(([k, v]) => `<b>${k}</b><span>${v}</span>`).join('')}</div>
<h2>${c.h.exp}</h2>
<div class="job main"><div class="jh"><b>${c.zero.title}</b><span>${c.zero.when}</span></div><div class="org">${c.zero.org}</div>
  <div class="lbl">${c.h.resp}</div>${ul(c.zero.resp)}<div class="lbl">${c.h.ach}</div>${ul(c.zero.ach, 'ok')}</div>
${c.earlier
  .map(
    (j) =>
      `<div class="job"><div class="jh"><b>${j.title}</b><span>${j.when}</span></div><div class="org">${j.org}</div>
  <div class="lbl">${c.h.resp}</div>${ul(j.resp)}<div class="lbl">${c.h.ach}</div>${ul(j.ach, 'ok')}</div>`,
  )
  .join('')}
<h2>${c.h.edu}</h2><div class="edu">${c.edu.map(([t, y]) => `<div><b style="font-weight:400">${t}</b><span>${y}</span></div>`).join('')}<p style="margin-top:1.4mm">${c.langs}</p><p style="margin-top:.8mm">${esc(c.about)}</p></div>
</body></html>`

const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] })
const p = await b.newPage()
for (const c of [cv.ru, cv.en]) {
  const tmp = path.join(process.env.TMPDIR || '/tmp', `${c.file}.html`)
  writeFileSync(tmp, html(c))
  await p.goto('file://' + tmp, { waitUntil: 'load' })
  const out = path.join(root, 'public/cv', c.file)
  // tagged: структура (заголовки, списки) для скринридеров и систем отбора; outline: закладки по разделам
  await p.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  })
  // метаданные: по ним PDF находят поисковики и HR-системы (название, автор, ключевые слова, язык)
  const doc = await PDFDocument.load(readFileSync(out), { updateMetadata: false })
  doc.setTitle(c.meta.title, { showInWindowTitleBar: true })
  doc.setAuthor('Bogdan Korzun (Богдан Корзун)')
  doc.setSubject(c.meta.subject)
  doc.setKeywords(c.meta.keywords)
  doc.setLanguage(c.lang)
  doc.setCreator('Bogdan Korzun')
  doc.setProducer('Bogdan Korzun')
  writeFileSync(out, await doc.save())
  console.log('cv', c.file)
}
await b.close()
