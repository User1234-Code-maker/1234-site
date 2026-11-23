import { site } from '../data/site'

type LinkKey = keyof typeof site.contacts | 'mail'

export function hrefFor(key: LinkKey): string {
  return key === 'mail' ? `mailto:${site.contacts.email}` : site.contacts[key] || '#'
}

export function isExternal(key: LinkKey): boolean {
  return key !== 'mail' && hrefFor(key) !== '#'
}

// «Fullstack Developer & Musician» → первое слово выделяется цветом
export function splitFirstWord(text: string): { head: string; tail: string } {
  const i = text.indexOf(' ')
  return i < 0 ? { head: text, tail: '' } : { head: text.slice(0, i), tail: text.slice(i) }
}
