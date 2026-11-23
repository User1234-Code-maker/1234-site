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

export const projects: Project[] = [
  {
    slug: 'label-erp',
    title: { ru: 'ERP для музыкального лейбла', en: 'ERP for a music label' },
    category: 'erp',
    ru: 'Внутренняя ERP лейбла: дистрибуция, поддержка, документы и доска задач. Таблицы на AG Grid, интерфейс на React 19.',
    en: 'The label’s in-house ERP: distribution, support, documents and a task board. AG Grid tables, React 19 interface.',
    long: {
      ru: `Внутренняя ERP-система музыкального лейбла Zero to Infinity: каталог релизов и треков, дистрибуция, поддержка, документы, финансы и кабинет артиста. Это монорепозиторий: интерфейс на React 19, серверная часть на NestJS (её пишут коллеги), данные в PostgreSQL и ClickHouse. В 2026 году я отвечаю за интерфейс и за постановку задач в разделах Distribution, Support, Documents и Troubleshooting.

Самая большая задача — сохранение состояния таблиц на AG Grid: версии схемы, защита от конфликтов при одновременной правке и синхронизация между вкладками. Я прошёл её целиком, от архитектурных решений и постановки до релиза в продакшен.

Troubleshooting — доска задач для команды. Канбан с приоритетом и сроком, переписка по задаче с файлами и голосовыми сообщениями, запросы данных у коллег, уведомления исполнителю и автору в Telegram. Доску я собирал в том же каркасе, что и раздел Documents, чтобы разделы выглядели и вели себя одинаково.

Кроме новых разделов было несколько раундов доработок: исправил системные ошибки позиционирования, унифицировал компоненты, сделал адаптивную вёрстку и поддержку reduced motion. Для всех разделов написал инструкции в Notion.`,
      en: `The in-house ERP of the music label Zero to Infinity: release and track catalogue, distribution, support, documents, finance and an artist cabinet. It is a monorepo: React 19 interface, NestJS backend (written by colleagues), data in PostgreSQL and ClickHouse. In 2026 I own the interface and the task breakdown for Distribution, Support, Documents and Troubleshooting.

The biggest task was saving table state on AG Grid: schema versions, protection from conflicts during simultaneous edits and synchronisation between tabs. I carried it through from architecture decisions and task breakdown to the production release.

Troubleshooting is a task board for the team. A kanban with priority and deadline, a thread per task with files and voice messages, data requests to colleagues, and Telegram notices to the assignee and the author. I built the board on the same shell as the Documents section so both behave and look the same.

On top of the new sections there were several rounds of polish: I fixed systemic positioning bugs, unified components, built a responsive layout and reduced-motion support. I wrote user guides for every section in Notion.`,
    },
    did: [
      {
        ru: 'Аналитика: требования, user stories и спецификации API для разделов Distribution, Support, Documents и Troubleshooting.',
        en: 'Analysis: requirements, user stories and API specs for Distribution, Support, Documents and Troubleshooting.',
      },
      {
        ru: 'Сохранение состояния таблиц на AG Grid: версии схемы, конфликты правок, синхронизация между вкладками.',
        en: 'Table state saving on AG Grid: schema versions, edit conflicts, sync between tabs.',
      },
      {
        ru: 'Доска Troubleshooting: канбан, приоритет и срок, обсуждение с файлами и голосовыми, уведомления в Telegram.',
        en: 'Troubleshooting board: kanban, priority and deadline, threads with files and voice, Telegram notices.',
      },
      {
        ru: 'Обсуждения в Documents и Support: закрыть и снова открыть обращение, просмотр файлов прямо в переписке.',
        en: 'Threads in Documents and Support: close and reopen a request, preview files right in the conversation.',
      },
      {
        ru: 'Выгрузка платёжных запросов по выбранному лейблу и в рабочую таблицу для Douyin.',
        en: 'Export of payment requests for a chosen label and into the working sheet for Douyin.',
      },
      {
        ru: 'Единые компоненты, адаптивная вёрстка, плавные анимации без нагрузки на страницу, поддержка reduced motion.',
        en: 'Shared components, responsive layout, smooth animations that stay light, reduced-motion support.',
      },
      {
        ru: 'Инструкции для пользователей разделов в Notion.',
        en: 'User guides for the sections in Notion.',
      },
    ],
    role: { ru: 'Системный аналитик, фронтенд-разработчик', en: 'Systems analyst, frontend developer' },
    year: '2026',
    tech: ['React 19', 'TypeScript', 'AG Grid', 'HeroUI', 'Tailwind v4', 'NestJS'],
    stack: [
      {
        name: { ru: 'Интерфейс', en: 'Interface' },
        items: [
          'React 19',
          'TypeScript',
          'Vite 6',
          'Tailwind CSS 4',
          'HeroUI',
          'React Aria',
          'React Router',
          'TanStack Query',
          'Refine',
        ],
      },
      {
        name: { ru: 'Таблицы, графики, перетаскивание', en: 'Tables, charts, drag and drop' },
        items: ['AG Grid Enterprise', 'AG Charts', 'dnd-kit', 'Three.js'],
      },
      {
        name: { ru: 'Языки интерфейса', en: 'Interface languages' },
        items: ['i18next', 'RU', 'EN', 'ES', 'PT'],
      },
      {
        name: { ru: 'Сервер и данные', en: 'Backend and data' },
        items: ['NestJS 11', 'Prisma 6', 'PostgreSQL', 'ClickHouse', 'Redis', 'BullMQ', 'Zod', 'CASL'],
      },
      {
        name: { ru: 'Интеграции', en: 'Integrations' },
        items: ['Telegram Bot API', 'Google Sheets API', 'S3', 'MCP'],
      },
      {
        name: { ru: 'Инфраструктура и качество', en: 'Infrastructure and quality' },
        items: ['pnpm', 'Turborepo', 'Docker', 'Playwright', 'Vitest', 'ESLint', 'knip'],
      },
    ],
    arch: [
      { label: { ru: 'Интерфейс', en: 'Interface' }, note: { ru: 'React 19', en: 'React 19' } },
      { label: { ru: 'Таблицы', en: 'Tables' }, note: { ru: 'AG Grid', en: 'AG Grid' } },
      {
        label: { ru: 'Сохранение состояния', en: 'State saving' },
        note: { ru: 'версии и синхронизация', en: 'versions and sync' },
      },
      { label: 'API', note: { ru: 'NestJS', en: 'NestJS' } },
      {
        label: { ru: 'Данные', en: 'Data' },
        note: { ru: 'PostgreSQL, ClickHouse', en: 'PostgreSQL, ClickHouse' },
      },
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
    ru: 'Платформа, где лейбл заказывает промо-ролики, а исполнители снимают их и получают выплаты. Я отвечаю за аналитику и модуль выплат.',
    en: 'A platform where the label orders promo videos and creators shoot them and get paid. I handle the analysis and the payout module.',
    long: {
      ru: `Hitviro — платформа клиппинга для музыкального лейбла. Заказчик ставит трек и бюджет, исполнители сами берут кампанию, снимают ролик со звуком трека и присылают ссылку. Система сама считает просмотры, проверяет ролик и начисляет деньги. Команда принимает ролики и собирает выплаты, а заказчик видит заказы и отчёты.

Рядом с платформой работает ростер: внутренняя база креаторов, у которых лейбл покупал промо. В ней история закупов и цен, страница трека и подбор креаторов под новый релиз. Ростер заменил промо-таблицы.

Технически это Python без тяжёлых фреймворков, отдельные процессы для API, замеров, рассылок, бота и резервных копий, интерфейс на чистом JavaScript без сборщика, 24 языка интерфейса, выплаты через PayPal и EasyStaff и автоматические проверки денежных правил. Платформа развёрнута на AWS.

Моя часть — аналитика и выплаты. Я исследовал текущие процессы и описал целевую схему, выбрал, как платформа обменивается данными с ERP, и проектирую платёжный модуль. Решение по архитектуре: слой API между Hitviro и ERP принадлежит ERP, а Hitviro работает как его клиент.`,
      en: `Hitviro is a clipping platform for a music label. A client sets a track and a budget, creators pick up a campaign on their own, shoot a video with the track’s sound and send a link. The system counts views, checks the video and accrues the money. The team accepts videos and assembles payouts, and the client sees orders and reports.

Next to the platform runs the roster: an internal database of creators the label has bought promo from. It holds purchase and price history, a page per track and a picker that finds creators for a new release. The roster replaced the promo spreadsheets.

Technically it is Python without heavy frameworks, separate processes for the API, measurements, mailings, the bot and backups, a plain JavaScript interface with no bundler, 24 interface languages, payouts through PayPal and EasyStaff and automatic checks of the money rules. The platform runs on AWS.

My part is analysis and payouts. I researched the current processes and described the target scheme, chose how the platform exchanges data with the ERP and I design the payout module. An architecture decision: the API layer between Hitviro and the ERP belongs to the ERP, and Hitviro works as its client.`,
    },
    did: [
      {
        ru: 'Исследование: как выплаты работают сейчас (AS-IS), как должны работать (TO-BE), созвон с промо-менеджером и вопросы команде.',
        en: 'Research: how payouts work today (AS-IS), how they should work (TO-BE), a call with the promo manager and questions to the team.',
      },
      {
        ru: 'Проектирование выплат через PayPal Payouts и EasyStaff: что платится, когда и кем подтверждается.',
        en: 'Design of payouts through PayPal Payouts and EasyStaff: what is paid, when and who approves it.',
      },
      {
        ru: 'Схема обмена данными с ERP: что передаётся, как часто и на чьей стороне лежит API.',
        en: 'Data exchange scheme with the ERP: what is sent, how often and which side owns the API.',
      },
      {
        ru: 'Изолированный платёжный модуль на сервере Hitviro: безопасность в приоритете, шифрование данных получателей, продумана повторная доставка пропущенных операций.',
        en: 'An isolated payout module on the Hitviro server: security first, encryption of recipient data, redelivery of missed operations is designed in.',
      },
      {
        ru: 'Работа по протоколу BRIEF → SPEC → PLAN → IMPLEMENTATION, отдельная ветка разработки и ревью с командой.',
        en: 'Work through the BRIEF → SPEC → PLAN → IMPLEMENTATION protocol, a separate development branch and team review.',
      },
    ],
    role: {
      ru: 'Системный аналитик, разработка модуля выплат',
      en: 'Systems analyst, payout module development',
    },
    year: '2026',
    tech: ['Python', 'SQLite', 'PostgreSQL', 'JavaScript', 'PayPal', 'EasyStaff'],
    stack: [
      {
        name: { ru: 'Сервер', en: 'Backend' },
        items: ['Python (stdlib)', 'SQLite', 'PostgreSQL', 'systemd'],
      },
      {
        name: { ru: 'Интерфейс', en: 'Interface' },
        items: [
          { ru: 'JavaScript без сборщика', en: 'Plain JavaScript, no bundler' },
          'CSS',
          { ru: '24 языка', en: '24 languages' },
        ],
      },
      {
        name: { ru: 'Деньги и интеграции', en: 'Money and integrations' },
        items: ['PayPal Payouts', 'EasyStaff API', { ru: 'Telegram-бот', en: 'Telegram bot' }, 'ERP API'],
      },
      {
        name: { ru: 'Инфраструктура', en: 'Infrastructure' },
        items: ['AWS EC2', 'Caddy', 'Cloudflare', 'SSH-туннель'],
      },
      {
        name: { ru: 'Качество', en: 'Quality' },
        items: [
          { ru: 'Автотесты', en: 'Automated tests' },
          'ruff',
          'gitleaks',
          'pre-commit',
          { ru: 'Проверки денежных правил', en: 'Money-rule checks' },
        ],
      },
    ],
    arch: [
      { label: { ru: 'Заказчик', en: 'Client' }, note: { ru: 'трек и бюджет', en: 'track and budget' } },
      { label: { ru: 'Кампания', en: 'Campaign' }, note: { ru: 'исполнители', en: 'creators' } },
      {
        label: { ru: 'Замеры', en: 'Measurements' },
        note: { ru: 'просмотры и проверка', en: 'views and checks' },
      },
      { label: { ru: 'Выплаты', en: 'Payouts' }, note: { ru: 'PayPal, EasyStaff', en: 'PayPal, EasyStaff' } },
      { label: 'ERP', note: { ru: 'учёт и платежи', en: 'accounting and payments' } },
    ],
    nda: true,
    hue: 330,
    featured: true,
  },
  {
    slug: 'telegram-bots',
    title: { ru: 'Telegram-боты и mini app', en: 'Telegram bots and mini app' },
    category: 'bots',
    ru: 'Больше десяти ботов и фоновых сервисов на Node.js: дистрибуция, поддержка, оплаты, сбор статистики. Работают в проде на Hetzner.',
    en: 'More than ten bots and background services on Node.js: distribution, support, payments, statistics collection. Running in production on Hetzner.',
    long: {
      ru: `Единое Node.js-приложение компании, в котором работает больше десяти Telegram-ботов и фоновых сервисов. Дистрибуция треков с мастером создания релиза и REST API, поддержка и разбор обращений, оплаты и промо-расходы, учёт видео креаторов, сканирование профилей TikTok, Instagram и YouTube, аналитика звуков TikTok.

Все боты построены на общей базе: единая авторизация (Redis, PostgreSQL и запасной вариант в памяти), ограничение частоты запросов, кэш и очереди на Redis, тексты на русском и английском. Данные лежат в PostgreSQL, файлы в S3-хранилище. Таблицы синхронизируются с Coda и Google Sheets, а сбор данных идёт через Playwright и Apify.

В проде всё работает на Hetzner Cloud: Docker-контейнер, Caddy на входе, логи через Dozzle, выкладка одной командой. Код покрыт тестами на Jest, перед коммитом срабатывают хуки Husky.

Я разрабатываю и поддерживаю ботов, настраиваю интеграции и пишу для пользователей инструкции в Notion.`,
      en: `A single Node.js application of the company that runs more than ten Telegram bots and background services. Track distribution with a release wizard and a REST API, support and request handling, payments and promo expenses, tracking of creators’ videos, scanning of TikTok, Instagram and YouTube profiles, TikTok sound analytics.

All bots share one base: a single authorisation layer (Redis, PostgreSQL and an in-memory fallback), rate limiting, cache and queues on Redis, texts in Russian and English. Data lives in PostgreSQL and files in S3 storage. Tables sync with Coda and Google Sheets, and data collection runs through Playwright and Apify.

In production everything runs on Hetzner Cloud: a Docker container, Caddy in front, logs through Dozzle, one-command deploys. The code is covered by Jest tests and Husky hooks run before every commit.

I build and maintain the bots, set up the integrations and write the user guides in Notion.`,
    },
    did: [
      {
        ru: 'Разработка ботов на общей базе: авторизация, ограничение частоты запросов, тексты на двух языках.',
        en: 'Building bots on the shared base: authorisation, rate limiting, two-language texts.',
      },
      {
        ru: 'Бот дистрибуции: мастер создания релиза, статусы и REST API.',
        en: 'Distribution bot: release creation wizard, statuses and a REST API.',
      },
      {
        ru: 'Оплаты и промо-расходы: запись напрямую в PostgreSQL и S3, режим Douyin и QR, уведомления о платежах.',
        en: 'Payments and promo expenses: writing straight to PostgreSQL and S3, Douyin and QR mode, payment notifications.',
      },
      {
        ru: 'Синхронизация Coda → PostgreSQL, агрегация промо-расходов по ISRC и UPC.',
        en: 'Coda → PostgreSQL sync, aggregation of promo expenses by ISRC and UPC.',
      },
      {
        ru: 'Сбор данных: сканирование профилей и аналитика звуков через Playwright и Apify.',
        en: 'Data collection: profile scanning and sound analytics through Playwright and Apify.',
      },
      {
        ru: 'Интеграции с Google Sheets и Discord, инструкции для пользователей в Notion.',
        en: 'Integrations with Google Sheets and Discord, user guides in Notion.',
      },
    ],
    role: { ru: 'Разработка и поддержка', en: 'Development and support' },
    year: '2026',
    tech: ['Node.js', 'Telegraf', 'PostgreSQL', 'Redis', 'Playwright', 'Docker'],
    stack: [
      {
        name: { ru: 'Сервер', en: 'Backend' },
        items: ['Node.js', 'Express', 'Telegraf', 'node-telegram-bot-api', 'discord.js'],
      },
      {
        name: { ru: 'Данные', en: 'Data' },
        items: ['PostgreSQL', 'Redis', 'S3 (AWS SDK)', 'sharp'],
      },
      {
        name: { ru: 'Сбор данных', en: 'Data collection' },
        items: ['Playwright', 'Apify', { ru: 'прокси', en: 'proxies' }],
      },
      {
        name: { ru: 'Интеграции', en: 'Integrations' },
        items: ['Telegram Bot API', 'Google Sheets API', 'Coda API', 'Discord'],
      },
      {
        name: { ru: 'Инфраструктура', en: 'Infrastructure' },
        items: ['Docker', 'Caddy', 'Hetzner Cloud', 'Dozzle'],
      },
      {
        name: { ru: 'Качество', en: 'Quality' },
        items: ['Jest', 'Husky', { ru: 'Notion (документация)', en: 'Notion (docs)' }],
      },
    ],
    arch: [
      { label: 'Telegram', note: { ru: 'боты и mini app', en: 'bots and mini app' } },
      { label: { ru: 'Общая база ботов', en: 'Shared bot base' }, note: { ru: 'Node.js', en: 'Node.js' } },
      { label: { ru: 'Redis', en: 'Redis' }, note: { ru: 'сессии и очереди', en: 'sessions and queues' } },
      { label: 'PostgreSQL', note: { ru: 'данные', en: 'data' } },
      { label: { ru: 'Coda и Google Sheets', en: 'Coda and Google Sheets' } },
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
    ru: 'Сервис, который находит трек в видео по ссылке и собирает статистику по роликам и релизам в TikTok, YouTube, Instagram и Spotify.',
    en: 'A service that finds the track in a video by link and collects statistics for videos and releases on TikTok, YouTube, Instagram and Spotify.',
    long: {
      ru: `Сервис, который по ссылке на видео определяет, какая музыка в нём играет. Принимает ссылки из YouTube, TikTok, Instagram, X, Facebook и Vimeo, вытаскивает звук через FFmpeg и отдаёт его на распознавание двум провайдерам: AudD и Shazam. Можно отправить сразу пачку ссылок.

Второе направление — статистика. Сервис снимает показатели роликов в TikTok, YouTube Shorts, Instagram Reels и Douyin. Методы идут цепочкой от лёгких к тяжёлым (curl_cffi, затем Playwright, затем Apify), поэтому платные запросы тратятся только там, где без них не обойтись. По Spotify собирает статистику треков и релизов, а Chrome-расширение помогает управлять сбором.

Данные лежат в PostgreSQL, очереди и кэш на Redis, итоги выгружаются в Coda и Google Sheets. Сервис покрыт тестами на Jest и supertest, работает в Docker.

Я участвую в разработке и доработке сервиса вместе с командой.`,
      en: `A service that finds out what music is playing in a video from its link. It accepts links from YouTube, TikTok, Instagram, X, Facebook and Vimeo, extracts the audio with FFmpeg and sends it to two recognition providers, AudD and Shazam. You can send a whole batch of links at once.

The second direction is statistics. The service takes the numbers of videos on TikTok, YouTube Shorts, Instagram Reels and Douyin. The methods run as a chain from light to heavy (curl_cffi, then Playwright, then Apify), so paid requests are spent only where there is no way around them. For Spotify it collects track and release statistics, and a Chrome extension helps manage the collection.

Data lives in PostgreSQL, queues and cache on Redis, results go out to Coda and Google Sheets. The service is covered by Jest and supertest tests and runs in Docker.

I take part in developing and improving the service together with the team.`,
    },
    did: [
      {
        ru: 'Точность статистики TikTok и Douyin: цифры принимаются только после подтверждения, что это нужный ролик.',
        en: 'Accuracy of TikTok and Douyin statistics: numbers are accepted only after the video is confirmed as the right one.',
      },
      {
        ru: 'Работа с лимитами Shazam: пауза при ограничении частоты запросов и запись распознанных треков.',
        en: 'Handling Shazam limits: backing off on rate limits and recording recognised tracks.',
      },
      {
        ru: 'Промо-ролики: классификация, чистка дублей раз в шесть часов, подстановка Douyin ID со страницы автора.',
        en: 'Promo videos: classification, a duplicate sweep every six hours, filling the Douyin ID from the author page.',
      },
      {
        ru: 'Мониторинг роликов AR-скаутов: опрос просмотров и сигналов по звуку, перепроверка выбранного видео по запросу.',
        en: 'Monitoring of AR scouts’ videos: polling views and sound signals, rechecking a chosen video on demand.',
      },
      {
        ru: 'CI: уведомления о деплое в Telegram.',
        en: 'CI: deploy notifications in Telegram.',
      },
    ],
    role: { ru: 'Участие в разработке', en: 'Development contributor' },
    year: '2026',
    tech: ['Node.js', 'Express', 'FFmpeg', 'Playwright', 'PostgreSQL', 'Redis'],
    stack: [
      {
        name: { ru: 'Сервер', en: 'Backend' },
        items: ['Node.js', 'Express', { ru: 'Python-скрипты', en: 'Python scripts' }, 'Winston'],
      },
      {
        name: { ru: 'Распознавание', en: 'Recognition' },
        items: ['AudD API', 'Shazam API', 'FFmpeg'],
      },
      {
        name: { ru: 'Сбор данных', en: 'Data collection' },
        items: ['Playwright (stealth)', 'curl_cffi', 'Apify', { ru: 'прокси', en: 'proxies' }],
      },
      {
        name: { ru: 'Данные', en: 'Data' },
        items: ['PostgreSQL', 'Redis', 'S3'],
      },
      {
        name: { ru: 'Интеграции', en: 'Integrations' },
        items: [
          'Spotify for Artists',
          'Coda API',
          'Google Sheets',
          { ru: 'Chrome-расширение', en: 'Chrome extension' },
        ],
      },
      {
        name: { ru: 'Инфраструктура и качество', en: 'Infrastructure and quality' },
        items: ['Docker', 'Jest', 'supertest', 'ESLint', 'Prettier'],
      },
    ],
    arch: [
      { label: { ru: 'Ссылка на видео', en: 'Video link' } },
      { label: 'FFmpeg', note: { ru: 'звук', en: 'audio' } },
      {
        label: { ru: 'AudD и Shazam', en: 'AudD and Shazam' },
        note: { ru: 'распознавание', en: 'recognition' },
      },
      { label: 'PostgreSQL', note: { ru: 'результаты и снимки', en: 'results and snapshots' } },
      { label: { ru: 'Coda и Google Sheets', en: 'Coda and Google Sheets' } },
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
    role: { ru: 'Фуллстек-разработчик', en: 'Fullstack developer' },
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
    role: { ru: 'Дизайн, вёрстка и разработка', en: 'Design, markup and development' },
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
    repo: 'https://github.com/User1234-Code-maker/portfolio',
    demo: 'https://user1234-code-maker.github.io/portfolio/',
    cover: coverPortfolio,
    shots: [shot1, shot2, shot3],
    hue: 262,
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
