/* ─────────────────────────────────────────────────────────────
   ЕДИНЫЙ ФАЙЛ ДАННЫХ
   Меняй тексты, проекты и ссылки только здесь.
   ───────────────────────────────────────────────────────────── */
import coverGameStudio from '../assets/img/cover-game-studio.webp'

export type Lang = 'ru' | 'en'

export interface Bi {
  ru: string
  en: string
}

export interface Project {
  title: string
  ru: string
  en: string
  tech: string[]
  repo?: string
  demo?: string
  /** картинка обложки; у заглушек не нужна — рисуется градиентом по hue */
  cover?: string
  /** true — заглушка «скоро», без ссылок */
  soon?: boolean
  /** оттенок градиента для заглушки (0–360) */
  hue?: number
}

export interface SkillGroup {
  name: Bi
  items: string[]
}

export interface Track {
  title: string
  length: string
}

export interface Job {
  period: string
  role: Bi
  company: Bi
  text: Bi
}

export interface Service {
  title: Bi
  text: Bi
}

export type Texts = Record<string, string>

export interface Site {
  contacts: Record<'email' | 'github' | 'linkedin' | 'telegram' | 'whatsapp' | 'soundcloud', string>
  projects: Project[]
  skills: SkillGroup[]
  tracks: Track[]
  jobs: Job[]
  services: Service[]
  t: Record<Lang, Texts>
}

export const site: Site = {
  // ── контакты: правятся в одном месте ────────────────────────
  contacts: {
    email: 'bogdan.korzun2003@gmail.com',
    github: 'https://github.com/User1234-Code-maker',
    linkedin: 'https://www.linkedin.com/in/bogdankorzun/',
    telegram: 'https://t.me/+66944867814',
    whatsapp: 'https://wa.me/79241181324',
    soundcloud: 'https://on.soundcloud.com/ZQIAtOfMUtpjdmA5vQ',
  },

  // ── проекты: чтобы добавить новый, скопируй блок ────────────
  projects: [
    {
      title: 'Game Studio Website',
      ru: 'Сайт игровой студии: каталог, корзина и оплата через Stripe.',
      en: 'Game studio site: catalogue, cart and Stripe checkout.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      repo: 'https://github.com/User1234-Code-maker/game-studio-site',
      demo: 'https://game-studio-site.onrender.com',
      cover: coverGameStudio,
    },
    // ↓ заглушки: замени на свои проекты (soon: true убирает ссылки и ставит бейдж «Скоро»)
    {
      title: 'Project 02',
      ru: 'Здесь появится описание проекта: что делает и для кого.',
      en: 'A short description goes here: what it does and who it is for.',
      tech: ['Vue', 'TypeScript'],
      soon: true,
      hue: 232,
    },
    {
      title: 'Project 03',
      ru: 'Здесь появится описание проекта: что делает и для кого.',
      en: 'A short description goes here: what it does and who it is for.',
      tech: ['Node.js', 'PostgreSQL'],
      soon: true,
      hue: 250,
    },
    {
      title: 'Project 04',
      ru: 'Здесь появится описание проекта: что делает и для кого.',
      en: 'A short description goes here: what it does and who it is for.',
      tech: ['React', 'Prisma'],
      soon: true,
      hue: 205,
    },
    {
      title: 'Project 05',
      ru: 'Здесь появится описание проекта: что делает и для кого.',
      en: 'A short description goes here: what it does and who it is for.',
      tech: ['Vue', 'Redis'],
      soon: true,
      hue: 262,
    },
    {
      title: 'Project 06',
      ru: 'Здесь появится описание проекта: что делает и для кого.',
      en: 'A short description goes here: what it does and who it is for.',
      tech: ['TypeScript', 'Node.js'],
      soon: true,
      hue: 220,
    },
    // {
    //   title: "Название",
    //   ru: "Описание по-русски.",
    //   en: "Description in English.",
    //   tech: ["Vue", "TypeScript"],
    //   repo: "https://github.com/...",
    //   demo: "https://...",
    //   cover: coverGameStudio
    // },
  ],

  // ── навыки (заглушка: поправь под себя) ─────────────────────
  skills: [
    {
      name: { ru: 'Фронтенд', en: 'Frontend' },
      items: ['Vue 3', 'React', 'TypeScript', 'HTML & CSS', 'Vite'],
    },
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
  ],

  // ── треки (заглушка: замени названиями своих релизов) ───────
  tracks: [
    { title: 'Track 01', length: '3:12' },
    { title: 'Track 02', length: '2:48' },
    { title: 'Track 03', length: '3:41' },
    { title: 'Track 04', length: '2:57' },
  ],

  // ── опыт (заглушка: впиши свои места работы) ────────────────
  jobs: [
    {
      period: '2025 — now',
      role: { ru: 'Системный аналитик и фронтенд-разработчик', en: 'Systems analyst & frontend developer' },
      company: { ru: 'Название компании', en: 'Company name' },
      text: {
        ru: 'Здесь коротко: чем занимался, какие задачи решал и что получилось.',
        en: 'A short note: what you did, which problems you solved and what came out of it.',
      },
    },
    {
      period: '2024',
      role: { ru: 'Фуллстек-разработчик', en: 'Fullstack developer' },
      company: { ru: 'Название компании или проект', en: 'Company or project name' },
      text: {
        ru: 'Здесь коротко: чем занимался, какие задачи решал и что получилось.',
        en: 'A short note: what you did, which problems you solved and what came out of it.',
      },
    },
    {
      period: '2023',
      role: { ru: 'Первые проекты', en: 'First projects' },
      company: { ru: 'Учёба и свои работы', en: 'Learning & side projects' },
      text: {
        ru: 'Здесь коротко: с чего начинал и чему научился.',
        en: 'A short note: where you started and what you learned.',
      },
    },
  ],

  // ── «что делаю» для блока About (заглушка) ──────────────────
  services: [
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
  ],

  // ── тексты сайта ────────────────────────────────────────────
  t: {
    ru: {
      nav_about: 'Обо мне',
      nav_projects: 'Работы',
      nav_music: 'Музыка',
      nav_contact: 'Контакты',
      talk: 'Написать',
      eyebrow: 'Богдан Корзун',
      h1a: 'Фуллстек-разработчик',
      h1b: 'и музыкант',
      tag: 'Делаю рабочие штуки.\nПишу музыку.',
      cta_projects: 'Смотреть работы',
      cta_music: 'Слушать музыку',
      scroll: 'Листай вниз',
      p_title: 'Работы',
      p_sub: 'Что я собрал и выложил.',
      p_badge: 'Скоро',
      s_title: 'Стек',
      s_sub: 'С чем я работаю.',
      m_tracks: 'Треки',
      m_play: 'Слушать',
      e_title: 'Опыт',
      e_sub: 'Где работал и что делал.',
      a_do: 'Что делаю',
      p_repo: 'Код',
      p_demo: 'Открыть',
      p_soon: 'Скоро новый проект',
      m_title: 'Музыка',
      m_sub: 'Пишу и выпускаю сам.',
      m_name: 'Мои треки',
      m_genre: 'Электроника. Хайперпоп. Новый рок.',
      m_listen: 'Слушать на SoundCloud',
      a_title: 'Обо мне',
      a_text:
        'Фуллстек-разработчик и системный аналитик. Делаю и фронт, и бэк, разбираюсь в сложных системах и описываю их. Многое собираю вместе с ИИ-агентами, а по вечерам пишу музыку.',
      a_open: 'Открыт к проектам',
      c_title: 'Контакты',
      c_sub: 'Пиши на почту или в мессенджер — отвечу.',
      c_mail: 'Написать на почту',
      foot: 'Сделано руками и кодом',
    },
    en: {
      nav_about: 'About',
      nav_projects: 'Projects',
      nav_music: 'Music',
      nav_contact: 'Contact',
      talk: "Let's talk",
      eyebrow: 'Bogdan Korzun',
      h1a: 'Fullstack Developer',
      h1b: '& Musician',
      tag: 'Build cool shit.\nMake good music.',
      cta_projects: 'View projects',
      cta_music: 'Listen to my music',
      scroll: 'Scroll down',
      p_title: 'Projects',
      p_sub: 'Things I built and shipped.',
      p_badge: 'Soon',
      s_title: 'Skills',
      s_sub: 'What I work with.',
      m_tracks: 'Tracks',
      m_play: 'Play',
      e_title: 'Experience',
      e_sub: 'Where I worked and what I did.',
      a_do: 'What I do',
      p_repo: 'Code',
      p_demo: 'Live demo',
      p_soon: 'New project soon',
      m_title: 'Music',
      m_sub: 'I write and release it myself.',
      m_name: 'My Music',
      m_genre: 'Electronic. Hyperpop. New Rock.',
      m_listen: 'Listen on SoundCloud',
      a_title: 'About',
      a_text:
        'Fullstack developer and systems analyst. I build both front and back, dig into complex systems and document them. Much of it I put together with AI agents, and in the evenings I make music.',
      a_open: 'Available for work',
      c_title: 'Contact',
      c_sub: 'Drop me an email or a message — I reply.',
      c_mail: 'Send an email',
      foot: 'Made by hand and code',
    },
  },
}
