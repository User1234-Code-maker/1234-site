// Фразы неподвижных существ. Ключи — из texts.ts, поэтому они отвечают на языке сайта.
// У каждого существа свои 3 реплики: на клики отвечают по очереди, а не случайно, чтобы не повторяться подряд.

export const palPhrases = {
  sleep: ['pal_sleep_1', 'pal_sleep_2', 'pal_sleep_3'],
  music: ['pal_music_1', 'pal_music_2', 'pal_music_3'],
  peek: ['pal_peek_1', 'pal_peek_2', 'pal_peek_3'],
  heart: ['pal_heart_1', 'pal_heart_2', 'pal_heart_3'],
  star: ['pal_star_1', 'pal_star_2', 'pal_star_3'],
  fish: ['pal_fish_1', 'pal_fish_2', 'pal_fish_3'],
  note: ['pal_note_1', 'pal_note_2', 'pal_note_3'],
  crane: ['pal_crane_1', 'pal_crane_2', 'pal_crane_3'],
  bird: ['pal_bird_1', 'pal_bird_2', 'pal_bird_3'],
} as const

export type PalName = keyof typeof palPhrases
