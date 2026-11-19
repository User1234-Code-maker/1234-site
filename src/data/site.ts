/* ─────────────────────────────────────────────────────────────
   ЕДИНЫЙ ФАЙЛ ДАННЫХ
   Меняй тексты, проекты и ссылки только здесь.
   ───────────────────────────────────────────────────────────── */
import coverGameStudio from '../assets/img/cover-game-studio.webp'

export type Lang = 'ru' | 'en'

export interface Project {
  title: string
  ru: string
  en: string
  tech: string[]
  repo?: string
  demo?: string
  cover: string
}

export type Texts = Record<string, string>

export interface Site {
  contacts: Record<'email' | 'github' | 'linkedin' | 'telegram' | 'whatsapp' | 'soundcloud', string>
  projects: Project[]
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
