// Логотипы технологий для главной и страницы «Обо мне».
// Это векторные оригиналы из набора devicon (лицензия MIT): чёткие на любом размере, без следов по краям.
import icNode from '../assets/tech/node.svg'
import icPg from '../assets/tech/pg.svg'
import icPrisma from '../assets/tech/prisma.svg'
import icPrismaDark from '../assets/tech/prisma-dark.svg'
import icReact from '../assets/tech/react.svg'
import icRedis from '../assets/tech/redis.svg'
import icTs from '../assets/tech/ts.svg'

interface TechIcon {
  name: string
  src: string
  /** вариант для тёмной темы, если родной цвет логотипа на тёмном не виден */
  dark?: string
}

export const techIcons: TechIcon[] = [
  { name: 'TypeScript', src: icTs },
  { name: 'React', src: icReact },
  { name: 'Node.js', src: icNode },
  { name: 'PostgreSQL', src: icPg },
  { name: 'Prisma', src: icPrisma, dark: icPrismaDark },
  { name: 'Redis', src: icRedis },
]
