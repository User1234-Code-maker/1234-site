/* ─────────────────────────────────────────────────────────────
   ПРОЕКТЫ. Чтобы добавить свой, скопируй блок и поменяй поля.
   sample: true — демонстрационный кейс: без ссылок, с бейджем «Пример».
   Настоящий проект отличается тем, что у него есть repo и/или demo.
   ───────────────────────────────────────────────────────────── */
import coverGameStudio from '../assets/img/cover-game-studio.webp'
import type { Category, Project } from './types'

export const categories: Category[] = ['web', 'erp', 'bots', 'ai', 'lab']

const sampleLong = {
  ru: 'Это демонстрационный кейс. Когда проект будет готов, здесь появятся задача, решение и результат.',
  en: 'This is a sample case. When the project is ready, the task, the solution and the result will appear here.',
}

export const projects: Project[] = [
  {
    slug: 'game-studio-website',
    title: 'Game Studio Website',
    category: 'web',
    ru: 'Сайт игровой студии: каталог, корзина и оплата через Stripe.',
    en: 'Game studio site: catalogue, cart and Stripe checkout.',
    long: {
      ru: 'Первый большой проект: многостраничный сайт игровой студии по макету. Каталог игр, корзина, оформление заказа и оплата картой через Stripe. Фронтенд на React, серверная часть на Node.js, данные в PostgreSQL.',
      en: 'My first big project: a multi-page game studio site built from a mockup. Game catalogue, cart, checkout and card payments through Stripe. React frontend, Node.js backend, data in PostgreSQL.',
    },
    role: { ru: 'Фуллстек-разработчик', en: 'Fullstack developer' },
    year: '2026',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    arch: [
      { label: 'React' },
      { label: 'Node.js API' },
      { label: 'PostgreSQL' },
      { label: 'Stripe', note: { ru: 'оплата', en: 'payments' } },
    ],
    repo: 'https://github.com/User1234-Code-maker/game-studio-site',
    demo: 'https://game-studio-site.onrender.com',
    cover: coverGameStudio,
    hue: 232,
    featured: true,
  },
  {
    slug: 'label-erp-panel',
    title: 'Label ERP Panel',
    category: 'erp',
    ru: 'Кабинет лейбла: релизы, документы и выплаты в одном месте.',
    en: 'Label back office: releases, documents and payouts in one place.',
    long: sampleLong,
    role: { ru: 'Системный аналитик, фронтенд', en: 'Systems analyst, frontend' },
    year: '2025',
    tech: ['React', 'TypeScript', 'REST API'],
    arch: [
      { label: 'React UI' },
      { label: 'REST API' },
      { label: 'Roles & rights', note: { ru: 'роли', en: 'roles' } },
      { label: 'SQL' },
    ],
    sample: true,
    hue: 250,
    featured: true,
  },
  {
    slug: 'artist-crm',
    title: 'Artist CRM',
    category: 'erp',
    ru: 'Карточки артистов, договоры и история общения.',
    en: 'Artist cards, contracts and communication history.',
    long: sampleLong,
    role: { ru: 'Аналитика и интерфейсы', en: 'Analysis and interfaces' },
    year: '2025',
    tech: ['Vue', 'TypeScript', 'PostgreSQL'],
    arch: [{ label: 'Vue UI' }, { label: 'API' }, { label: 'PostgreSQL' }],
    sample: true,
    hue: 214,
  },
  {
    slug: 'release-notify-bot',
    title: 'Release Notify Bot',
    category: 'bots',
    ru: 'Бот, который сообщает артистам о статусе релиза.',
    en: 'A bot that tells artists about their release status.',
    long: sampleLong,
    role: { ru: 'Разработка бота', en: 'Bot development' },
    year: '2025',
    tech: ['Node.js', 'Telegram API', 'Redis'],
    arch: [
      { label: 'Telegram' },
      { label: 'Bot server' },
      { label: 'Redis', note: { ru: 'очередь', en: 'queue' } },
      { label: 'ERP API' },
    ],
    sample: true,
    hue: 205,
    featured: true,
  },
  {
    slug: 'support-helper-bot',
    title: 'Support Helper Bot',
    category: 'bots',
    ru: 'Первая линия поддержки: ответы на частые вопросы.',
    en: 'First-line support: answers to frequent questions.',
    long: sampleLong,
    role: { ru: 'Разработка бота', en: 'Bot development' },
    year: '2026',
    tech: ['Node.js', 'TypeScript'],
    arch: [{ label: 'Telegram' }, { label: 'Bot server' }, { label: 'FAQ base' }],
    sample: true,
    hue: 224,
  },
  {
    slug: 'doc-autopilot',
    title: 'Doc Autopilot',
    category: 'ai',
    ru: 'Автоматическая сборка документов из данных ERP.',
    en: 'Automatic document assembly from ERP data.',
    long: sampleLong,
    role: { ru: 'Автоматизация', en: 'Automation' },
    year: '2026',
    tech: ['Node.js', 'LLM API', 'PostgreSQL'],
    arch: [
      { label: 'ERP data' },
      { label: 'Templates' },
      { label: 'LLM', note: { ru: 'черновик', en: 'draft' } },
      { label: 'PDF' },
    ],
    sample: true,
    hue: 262,
    featured: false,
  },
  {
    slug: 'agent-workbench',
    title: 'Agent Workbench',
    category: 'ai',
    ru: 'Рабочее место для задач с ИИ-агентами и проверкой результата.',
    en: 'A workbench for AI-agent tasks with result review.',
    long: sampleLong,
    role: { ru: 'Идея и прототип', en: 'Idea and prototype' },
    year: '2026',
    tech: ['Vue', 'TypeScript', 'LLM API'],
    arch: [{ label: 'Task UI' }, { label: 'Agent runner' }, { label: 'Review' }],
    sample: true,
    hue: 240,
  },
  {
    slug: 'sound-sketchbook',
    title: 'Sound Sketchbook',
    category: 'lab',
    ru: 'Эксперимент: визуализация звука в браузере.',
    en: 'Experiment: sound visualisation in the browser.',
    long: sampleLong,
    role: { ru: 'Эксперимент', en: 'Experiment' },
    year: '2026',
    tech: ['Web Audio', 'Canvas', 'TypeScript'],
    arch: [{ label: 'Audio input' }, { label: 'Analyser' }, { label: 'Canvas' }],
    sample: true,
    hue: 270,
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const categoryOf = (c: Category) => `cat_${c}`
