import type { Job, Milestone, Service, SkillGroup } from './types'

export const stackIcons = ['TypeScript', 'React', 'Vue', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Git']

export const skills: SkillGroup[] = [
  { name: { ru: 'Фронтенд', en: 'Frontend' }, items: ['Vue 3', 'React', 'TypeScript', 'HTML & CSS', 'Vite'] },
  {
    name: { ru: 'Бэкенд и данные', en: 'Backend & data' },
    items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'REST API'],
  },
  {
    name: { ru: 'Аналитика', en: 'Analysis' },
    items: ['Требования', 'UML', 'BPMN', 'Документация API', 'SQL'],
  },
  {
    name: { ru: 'Инструменты', en: 'Tools' },
    items: ['Git', 'GitHub Actions', 'Playwright', 'Vitest', 'ИИ-агенты'],
  },
]

/** Заглушки опыта: впиши свои места работы */
export const jobs: Job[] = [
  {
    period: '2025 — now',
    role: { ru: 'Системный аналитик и фронтенд-разработчик', en: 'Systems analyst & frontend developer' },
    company: { ru: 'Музыкальный лейбл', en: 'Music label' },
    text: {
      ru: 'ERP-интерфейсы, внутренние инструменты, боты и документация.',
      en: 'ERP interfaces, internal tools, bots and documentation.',
    },
  },
  {
    period: '2024',
    role: { ru: 'Фуллстек-разработчик', en: 'Fullstack developer' },
    company: { ru: 'Свои проекты', en: 'Own projects' },
    text: {
      ru: 'Собирал сайты и сервисы целиком, от базы до интерфейса.',
      en: 'Built sites and services end to end, from database to interface.',
    },
  },
]

export const services: Service[] = [
  {
    title: { ru: 'Интерфейсы', en: 'Interfaces' },
    text: {
      ru: 'Аккуратная вёрстка и фронтенд на Vue и React.',
      en: 'Clean markup and frontend in Vue and React.',
    },
  },
  {
    title: { ru: 'Серверная часть', en: 'Backend' },
    text: {
      ru: 'API, базы данных, интеграции и платежи.',
      en: 'APIs, databases, integrations and payments.',
    },
  },
  {
    title: { ru: 'Системный анализ', en: 'Systems analysis' },
    text: {
      ru: 'Разбираю сложные системы и описываю их понятно.',
      en: 'Breaking down complex systems and documenting them clearly.',
    },
  },
  {
    title: { ru: 'Музыка', en: 'Music' },
    text: { ru: 'Пишу и выпускаю треки сам.', en: 'Writing and releasing tracks myself.' },
  },
]

/** Таймлайн: примерные этапы, правь под себя */
export const milestones: Milestone[] = [
  {
    year: '2023',
    title: { ru: 'Первые строки кода', en: 'First lines of code' },
    text: {
      ru: 'Начал учить вёрстку и собирать маленькие страницы руками.',
      en: 'Started learning markup and building small pages by hand.',
    },
  },
  {
    year: '2024',
    title: { ru: 'Полный стек', en: 'Full stack' },
    text: {
      ru: 'Перешёл от страниц к сервисам: база данных, API, оплата.',
      en: 'Moved from pages to services: database, API, payments.',
    },
  },
  {
    year: '2025',
    title: { ru: 'Работа в лейбле', en: 'Working at a label' },
    text: {
      ru: 'Аналитика и фронтенд для ERP, боты, документация.',
      en: 'Analysis and frontend for an ERP, bots, documentation.',
    },
  },
  {
    year: '2026',
    title: { ru: 'Это портфолио', en: 'This portfolio' },
    text: {
      ru: 'Собираю личный сайт вместе с ИИ-агентом и учусь на ходу.',
      en: 'Building my own site together with an AI agent and learning on the way.',
    },
  },
]
