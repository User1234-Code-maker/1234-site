/* ─────────────────────────────────────────────────────────────
   ПРОЕКТЫ. Чтобы добавить свой, скопируй блок и поменяй поля.
   nda: true — проект под NDA: без ссылок и скриншотов, с бейджем NDA.
   sample: true — демонстрационный кейс: без ссылок, с бейджем «Пример».
   Настоящий проект отличается тем, что у него есть repo и/или demo.
   ───────────────────────────────────────────────────────────── */
import coverGameStudio from '../assets/img/cover-game-studio.webp'
import coverPortfolio from '../assets/img/cover-portfolio.webp'
import gsHome from '../assets/img/shot-game-studio-home.webp'
import gsServices from '../assets/img/shot-game-studio-services.webp'
import gsNews from '../assets/img/shot-game-studio-news.webp'
import shot1 from '../assets/img/shot-portfolio-1.webp'
import shot2 from '../assets/img/shot-portfolio-2.webp'
import shot3 from '../assets/img/shot-portfolio-3.webp'
import type { Category, Project } from './types'

export const categories: Category[] = ['web', 'erp', 'bots', 'ai']

const list: Project[] = [
  {
    slug: 'label-erp',
    title: { ru: 'ERP для музыкального лейбла', en: 'ERP for a music label' },
    category: 'erp',
    ru: 'Внутренняя ERP музыкального лейбла: дистрибуция, поддержка, документы и доска задач.',
    en: 'The in-house ERP of a music label: distribution, support, documents and a task board.',
    long: {
      ru: `Внутренняя ERP-система музыкального лейбла Zero to Infinity: каталог релизов, дистрибуция, поддержка, документы и кабинет артиста. Проект закрытый, поэтому без подробностей.

Участвую как системный аналитик и фронтенд-разработчик: ставлю задачи и делаю интерфейс разделов Distribution, Support, Documents и Troubleshooting. Самая большая задача была про таблицы: сохранить их состояние, чтобы настройки не терялись между сессиями и вкладками. Прошёл её от идеи до релиза. Для разделов написал инструкции в Notion.`,
      en: `The in-house ERP of the music label Zero to Infinity: release catalogue, distribution, support, documents and an artist cabinet. The project is closed, so no details.

I take part as a systems analyst and frontend developer: I set the tasks and build the interface of the Distribution, Support, Documents and Troubleshooting sections. The biggest task was about tables: saving their state so settings are not lost between sessions and tabs. I carried it from the idea to the release. I wrote user guides for the sections in Notion.`,
    },
    role: { ru: 'Фуллстек-разработчик и системный аналитик', en: 'Fullstack developer and systems analyst' },
    year: '2026',
    tech: ['React 19', 'TypeScript', 'AG Grid', 'HeroUI', 'Tailwind', 'NestJS', 'PostgreSQL', 'ClickHouse'],
    arch: [
      { label: { ru: 'Интерфейс', en: 'Interface' } },
      { label: { ru: 'Таблицы', en: 'Tables' } },
      { label: 'API' },
      { label: { ru: 'База данных', en: 'Database' } },
    ],
    nda: true,
    hue: 250,
    featured: true,
  },
  {
    slug: 'hitviro',
    title: { ru: 'Hitviro: платформа клиппинга', en: 'Hitviro: clipping platform' },
    category: 'web',
    visual: 'platform',
    ru: 'Платформа, где лейбл заказывает промо-ролики у исполнителей. Я отвечаю за аналитику и выплаты.',
    en: 'A platform where the label orders promo videos from creators. I handle the analysis and payouts.',
    long: {
      ru: `Hitviro — платформа для музыкального лейбла: заказчик ставит задачу на промо-ролики, исполнители снимают их, а система следит за результатом и оплатой. Проект закрытый, поэтому без подробностей.

Моя роль — системный аналитик: исследовал текущие процессы, описал, как всё должно работать, и проектирую часть платформы, которая отвечает за выплаты.`,
      en: `Hitviro is a platform for a music label: a client sets a task for promo videos, creators shoot them, and the system follows the result and the payment. The project is closed, so no details.

My role is systems analyst: I researched the current processes, described how everything should work and I design the part of the platform that handles payouts.`,
    },
    role: { ru: 'Фуллстек-разработчик и системный аналитик', en: 'Fullstack developer and systems analyst' },
    year: '2026',
    tech: ['Python', 'JavaScript', 'PostgreSQL', 'SQLite'],
    arch: [
      { label: { ru: 'Заказчик', en: 'Client' } },
      { label: { ru: 'Кампания', en: 'Campaign' } },
      { label: { ru: 'Исполнители', en: 'Creators' } },
      { label: { ru: 'Выплаты', en: 'Payouts' } },
    ],
    nda: true,
    hue: 330,
    featured: true,
  },
  {
    slug: 'telegram-bots',
    title: { ru: 'Telegram-боты и mini app', en: 'Telegram bots and mini app' },
    category: 'bots',
    ru: 'Внутренние Telegram-боты компании, которые автоматизируют рабочие процессы: дистрибуция, поддержка, оплаты.',
    en: 'The company’s in-house Telegram bots that automate working processes: distribution, support, payments.',
    long: {
      ru: `Набор внутренних Telegram-ботов и mini app компании. Они автоматизируют рабочие процессы: дистрибуцию треков, поддержку, оплаты, учёт и отчётность. Проект закрытый, поэтому без подробностей.

Я разрабатываю и поддерживаю ботов, настраиваю интеграции и пишу для пользователей инструкции в Notion.`,
      en: `A set of the company’s in-house Telegram bots and a mini app. They automate working processes: track distribution, support, payments, accounting and reporting. The project is closed, so no details.

I build and maintain the bots, set up the integrations and write the user guides in Notion.`,
    },
    role: { ru: 'Фуллстек-разработчик и системный аналитик', en: 'Fullstack developer and systems analyst' },
    year: '2026',
    tech: ['Node.js', 'Telegraf', 'PostgreSQL', 'Redis', 'Docker'],
    arch: [
      { label: 'Telegram' },
      { label: { ru: 'Боты и mini app', en: 'Bots and mini app' } },
      { label: { ru: 'База данных', en: 'Database' } },
      { label: { ru: 'Таблицы и отчёты', en: 'Sheets and reports' } },
    ],
    nda: true,
    hue: 205,
    featured: true,
  },
  {
    slug: 'music-recognition',
    title: { ru: 'Распознавание музыки и статистика', en: 'Music recognition and statistics' },
    category: 'ai',
    visual: 'wave',
    ru: 'Внутренний сервис: определяет музыку в видео по ссылке и собирает статистику по роликам и релизам.',
    en: 'An in-house service: finds the music in a video by link and collects statistics for videos and releases.',
    long: {
      ru: `Внутренний сервис компании, который по ссылке на видео определяет, какая музыка в нём играет, и собирает статистику по роликам и релизам. Проект закрытый, поэтому без подробностей.

Участвую в разработке и доработке вместе с командой.`,
      en: `An in-house service of the company that finds out what music is playing in a video from its link and collects statistics for videos and releases. The project is closed, so no details.

I take part in developing and improving it together with the team.`,
    },
    role: { ru: 'Фуллстек-разработчик и системный аналитик', en: 'Fullstack developer and systems analyst' },
    year: '2026',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'FFmpeg', 'Docker'],
    arch: [
      { label: { ru: 'Ссылка на видео', en: 'Video link' } },
      { label: { ru: 'Распознавание', en: 'Recognition' } },
      { label: { ru: 'База данных', en: 'Database' } },
      { label: { ru: 'Отчёты', en: 'Reports' } },
    ],
    nda: true,
    hue: 175,
  },
  {
    slug: 'game-studio-website',
    title: { ru: 'Сайт игровой студии', en: 'Game Studio Website' },
    category: 'web',
    ru: 'Многостраничный сайт игровой студии: каталог, корзина, оплата через Stripe, 3D-геймпад в первом экране.',
    en: 'A multi-page game studio site: catalogue, cart, Stripe payments, a 3D gamepad on the first screen.',
    long: {
      ru: `Первый большой проект: многостраничный сайт игровой студии по макету. Каталог игр, корзина, оформление заказа и оплата картой через Stripe в тестовом режиме. Фронтенд на React, серверная часть на Node.js, заказы и сообщения лежат в PostgreSQL.

Вёрстку по макету я начал руками, потому что учился, а дальше довёл проект вместе с ИИ-агентом. На первом экране вращается 3D-модель геймпада (формат GLB, three.js). Интерфейс на трёх языках (английский, русский, испанский), есть светлая и тёмная темы. Сайт спокойный, без резких эффектов прокрутки, чтобы не тормозил.

Сервер и база развёрнуты на бесплатном хостинге: Node.js на Render, PostgreSQL на Neon. Заказы остаются в статусе «создан»: вебхуки Stripe я не подключал.`,
      en: `My first big project: a multi-page game studio site built from a mockup. Game catalogue, cart, checkout and card payments through Stripe in test mode. React frontend, Node.js backend, orders and messages stored in PostgreSQL.

I started the markup by hand from the mockup because I was learning, and then finished the project together with an AI agent. A 3D gamepad model (GLB, three.js) rotates on the first screen. The interface comes in three languages (English, Russian, Spanish) with light and dark themes. The site is calm, with no harsh scroll effects, so it stays light.

The server and the database run on free hosting: Node.js on Render, PostgreSQL on Neon. Orders stay in the “created” status because I did not connect Stripe webhooks.`,
    },
    did: [
      {
        ru: 'Вёрстка страниц по макету: главная, каталог, услуги, новости, корзина.',
        en: 'Page markup from the mockup: home, catalogue, services, news, cart.',
      },
      {
        ru: 'Серверная часть на Node.js: заказы и сообщения в PostgreSQL, оплата через Stripe.',
        en: 'Node.js backend: orders and messages in PostgreSQL, payments through Stripe.',
      },
      {
        ru: '3D-геймпад на первом экране (three.js, GLB).',
        en: '3D gamepad on the first screen (three.js, GLB).',
      },
      {
        ru: 'Три языка интерфейса и светлая или тёмная тема.',
        en: 'Three interface languages and a light or dark theme.',
      },
      {
        ru: 'Публикация: Render и Neon, репозиторий на GitHub.',
        en: 'Publishing: Render and Neon, a repository on GitHub.',
      },
    ],
    role: { ru: 'Фуллстек-разработчик и системный аналитик', en: 'Fullstack developer and systems analyst' },
    year: '2026',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'three.js'],
    stack: [
      {
        name: { ru: 'Интерфейс', en: 'Interface' },
        items: ['React', 'CSS', 'three.js (GLB)', 'RU / EN / ES'],
      },
      {
        name: { ru: 'Сервер и данные', en: 'Backend and data' },
        items: ['Node.js', 'PostgreSQL', 'Neon'],
      },
      {
        name: { ru: 'Оплата', en: 'Payments' },
        items: [{ ru: 'Stripe (тестовый режим)', en: 'Stripe (test mode)' }],
      },
      {
        name: { ru: 'Публикация', en: 'Publishing' },
        items: ['Render', 'GitHub'],
      },
    ],
    arch: [
      { label: 'React' },
      { label: 'Node.js API' },
      { label: 'PostgreSQL', note: { ru: 'Neon', en: 'Neon' } },
      { label: 'Stripe', note: { ru: 'оплата', en: 'payments' } },
    ],
    repo: 'https://github.com/User1234-Code-maker/game-studio-site',
    demo: 'https://game-studio-site.onrender.com',
    cover: coverGameStudio,
    hue: 232,
    featured: true,
    shots: [gsHome, gsServices, gsNews],
  },
  {
    slug: 'portfolio-site',
    title: { ru: 'Личный сайт-портфолио', en: 'Personal portfolio site' },
    category: 'web',
    ru: 'Этот сайт: многостраничное портфолио на двух языках с тёмной темой, тестами и быстрой загрузкой.',
    en: 'This site: a multi-page bilingual portfolio with a dark theme, tests and fast loading.',
    long: {
      ru: `Личный сайт, который вы сейчас смотрите. Vue 3, TypeScript и Vite, свой CSS без библиотек. Несколько страниц, две языковые версии (русский и английский), светлая и тёмная темы, заставка, ленивая загрузка картинок и доступность.

У сайта есть собственный аудиоплеер с управлением из системной шторки телефона, пиксельный котик-талисман, который говорит и откликается на клики, и анимации только через transform и opacity, чтобы страница не тормозила на телефоне.

Проверки: unit-тесты на Vitest, сквозные тесты на Playwright вместе с проверкой доступности axe, замеры Lighthouse. Код проверяют ESLint, Prettier, vue-tsc и knip, всё это запускается в GitHub Actions. Публикуется на GitHub Pages. Собирал вместе с ИИ-агентом и учился на ходу.`,
      en: `The personal site you are looking at. Vue 3, TypeScript and Vite with hand-written CSS and no UI libraries. Several pages, two languages (Russian and English), light and dark themes, a preloader, lazy image loading and accessibility.

The site has its own audio player controlled from the phone’s system shade, a pixel cat mascot that talks and reacts to clicks, and animations built only on transform and opacity, so the page stays smooth on a phone.

Checks: unit tests on Vitest, end-to-end tests on Playwright together with axe accessibility checks, Lighthouse audits. ESLint, Prettier, vue-tsc and knip check the code, and all of it runs in GitHub Actions. Published to GitHub Pages. Built together with an AI agent, learning on the way.`,
    },
    did: [
      {
        ru: 'Дизайн-система на CSS-переменных: светлая и тёмная темы, общие токены для всех страниц.',
        en: 'A design system on CSS variables: light and dark themes, shared tokens for every page.',
      },
      {
        ru: 'Страницы About, Projects, Music, Contact, 404 и страницы проектов, две языковые версии.',
        en: 'About, Projects, Music, Contact, 404 and project pages, two language versions.',
      },
      {
        ru: 'Свой аудиоплеер с Media Session и плавная заставка.',
        en: 'A custom audio player with Media Session and a smooth preloader.',
      },
      {
        ru: 'Пиксельный котик и его друзья: фразы, клики, перетаскивание.',
        en: 'A pixel cat and its friends: speech, clicks, dragging.',
      },
      {
        ru: 'Автотесты, проверка доступности, Lighthouse и сборка в GitHub Actions.',
        en: 'Automated tests, accessibility checks, Lighthouse and the GitHub Actions pipeline.',
      },
    ],
    role: { ru: 'Фуллстек-разработчик и системный аналитик', en: 'Fullstack developer and systems analyst' },
    year: '2026',
    tech: ['Vue 3', 'TypeScript', 'Vite', 'Vitest', 'Playwright'],
    stack: [
      {
        name: { ru: 'Интерфейс', en: 'Interface' },
        items: [
          'Vue 3',
          'TypeScript',
          'Vue Router',
          { ru: 'CSS без библиотек', en: 'Plain CSS, no libraries' },
        ],
      },
      {
        name: { ru: 'Сборка', en: 'Build' },
        items: ['Vite', 'vue-tsc', { ru: 'Python (Pillow) для картинок', en: 'Python (Pillow) for images' }],
      },
      {
        name: { ru: 'Тесты и качество', en: 'Tests and quality' },
        items: ['Vitest', 'Playwright', 'axe', 'Lighthouse', 'ESLint', 'Prettier', 'knip'],
      },
      {
        name: { ru: 'Публикация', en: 'Publishing' },
        items: ['GitHub Actions', 'GitHub Pages'],
      },
    ],
    arch: [
      { label: 'Vue 3 + Router' },
      { label: 'Vite', note: { ru: 'сборка', en: 'build' } },
      { label: 'GitHub Actions' },
      { label: 'GitHub Pages' },
    ],
    repo: 'https://github.com/User1234-Code-maker/1234-site',
    demo: 'https://user1234-code-maker.github.io/1234-site/',
    cover: coverPortfolio,
    shots: [shot1, shot2, shot3],
    hue: 262,
  },
]

// открытые проекты первыми, NDA после
export const projects: Project[] = [...list.filter((p) => !p.nda), ...list.filter((p) => p.nda)]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
