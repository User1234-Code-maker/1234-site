export type Lang = 'ru' | 'en'

export interface Bi {
  ru: string
  en: string
}

export type Category = 'web' | 'erp' | 'bots' | 'ai' | 'lab'

/** вид иллюстрации для проектов без обложки */
export type Visual = 'erp' | 'bots' | 'platform' | 'wave'

/** группа технологий для блока «Стек» на странице проекта */
export interface StackGroup {
  name: Bi
  items: Array<string | Bi>
}

interface ArchNode {
  label: string | Bi
  note?: Bi
}

export interface Project {
  slug: string
  title: Bi
  category: Category
  ru: string
  en: string
  /** развёрнутое описание для страницы проекта; абзацы разделяются пустой строкой */
  long: Bi
  /** что именно сделано мной: короткие пункты для блока «Что я делал» */
  did?: Bi[]
  /** результаты в цифрах: только проверяемые факты (тесты, скорость, объём) */
  results?: { value: string; label: Bi }[]
  /** полный стек по группам; в карточках и в строке фактов остаётся короткий tech */
  stack?: StackGroup[]
  /** иллюстрация для проекта без обложки; по умолчанию выбирается по категории */
  visual?: Visual
  role: Bi
  year: string
  tech: string[]
  /** путь данных слева направо, для схемы архитектуры */
  arch: ArchNode[]
  repo?: string
  demo?: string
  /** картинка обложки; без неё рисуется градиентом по hue */
  cover?: string
  /** true — демонстрационный кейс: ссылок нет, стоит бейдж «Пример» */
  sample?: boolean
  /** true — проект под NDA: ссылок и скриншотов нет, стоит бейдж NDA */
  nda?: boolean
  /** настоящие скриншоты (если есть) */
  shots?: string[]
  /** оттенок градиента обложки (0–360) */
  hue: number
  featured?: boolean
}

export interface SkillGroup {
  name: Bi
  items: Array<string | Bi>
}

export type ReleaseKind = 'album' | 'single' | 'ep'

export interface Track {
  title: string
  /** «м:сс»; если длина неизвестна, поле не заполняется */
  length?: string
  /** путь к mp3 внутри public/ (например audio/album-1234/02-halat.mp3) */
  src?: string
}

interface ReleaseLink {
  name: string
  url: string
}

export interface Release {
  id: string
  title: string
  kind: ReleaseKind
  /** ISO-дата */
  date: string
  genres: string[]
  hue: number
  tracks: Track[]
  /** true — демонстрационный релиз, аудио нет */
  sample: boolean
  /** обложки: большая и маленькая, если файла нет — рисуется заглушка */
  cover?: string
  coverSm?: string
  /** ссылки на площадки */
  links?: ReleaseLink[]
  blurb?: Bi
}

export interface Job {
  period: Bi
  role: Bi
  company: Bi
  text: Bi
}

export interface Service {
  title: Bi
  text: Bi
}

export interface Milestone {
  year: string
  title: Bi
  text: Bi
}

export interface Contacts {
  email: string
  github: string
  linkedin: string
  telegram: string
  whatsapp: string
  soundcloud: string
}
