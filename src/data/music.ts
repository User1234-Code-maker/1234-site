/* ─────────────────────────────────────────────────────────────
   МУЗЫКА. Это демонстрационные релизы: настоящих файлов нет.
   Когда выложишь трек, поставь sample: false и обнови название.
   Аудио в плеер не подключается, он работает в демо-режиме.
   ───────────────────────────────────────────────────────────── */
import type { Release } from './types'

export const artistName = 'User1234'

export const releases: Release[] = [
  {
    id: 'sky-signal',
    title: 'Sky Signal',
    kind: 'album',
    date: '2026-03-14',
    genres: ['Electronic', 'Hyperpop'],
    hue: 232,
    sample: true,
    tracks: [
      { title: 'Blue Hour', length: '3:12' },
      { title: 'Cloud Index', length: '2:48' },
      { title: 'Pixel Rain', length: '3:41' },
      { title: 'Night Bus', length: '2:57' },
      { title: 'Signal Fade', length: '4:05' },
    ],
  },
  {
    id: 'paper-city',
    title: 'Paper City',
    kind: 'ep',
    date: '2025-11-02',
    genres: ['New Rock', 'Electronic'],
    hue: 262,
    sample: true,
    tracks: [
      { title: 'Paper City', length: '3:20' },
      { title: 'Last Train', length: '3:02' },
      { title: 'Small Lights', length: '2:44' },
    ],
  },
  {
    id: 'neon-cat',
    title: 'Neon Cat',
    kind: 'single',
    date: '2025-08-21',
    genres: ['Hyperpop'],
    hue: 205,
    sample: true,
    tracks: [{ title: 'Neon Cat', length: '2:36' }],
  },
  {
    id: 'rooftop',
    title: 'Rooftop',
    kind: 'single',
    date: '2025-05-09',
    genres: ['New Rock'],
    hue: 248,
    sample: true,
    tracks: [{ title: 'Rooftop', length: '3:15' }],
  },
]
