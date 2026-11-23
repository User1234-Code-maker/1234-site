// Данные котика-талисмана: где он сидит на каждой странице и какие фразы говорит.
// Фразы — ключи из texts.ts, поэтому котик говорит на языке сайта.

type CatSpot = { side: 'left' | 'right'; bottom: string; peek: boolean }

export const catSpots: Record<string, CatSpot> = {
  home: { side: 'right', bottom: '30vh', peek: false },
  projects: { side: 'right', bottom: '22vh', peek: true },
  project: { side: 'left', bottom: '0px', peek: false },
  music: { side: 'left', bottom: '34vh', peek: true },
  about: { side: 'right', bottom: '0px', peek: false },
  contact: { side: 'right', bottom: '46vh', peek: true },
  'not-found': { side: 'left', bottom: '0px', peek: false },
}

export const catPhrases = {
  click: ['cat_line_1', 'cat_line_2', 'cat_line_3', 'cat_line_4'],
  curious: ['cat_curious_1', 'cat_curious_2', 'cat_curious_3'],
  idle: ['cat_idle_1', 'cat_idle_2', 'cat_idle_3', 'cat_idle_4', 'cat_idle_5'],
  music: ['cat_music_1', 'cat_music_2'],
  scream: ['cat_scream_1', 'cat_scream_2', 'cat_scream_3'],
  land: ['cat_land_1', 'cat_land_2', 'cat_land_3'],
} as const

export type CatMood = keyof typeof catPhrases
