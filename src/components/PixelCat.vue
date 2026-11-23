<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang'
import { reducedMotion } from '../utils/pageScroll'
import { usePlayer } from '../composables/usePlayer'
import { useCatSpeech } from '../composables/useCatSpeech'
import { catSpots as spots } from '../data/cat'
import catUrl from '../assets/img/cat.png'

// Пасхалка: котик на внутренних страницах. Сидит в своём месте, выглядывает с края,
// мяукает по клику, засыпает, если его долго не трогать. Его можно взять и перенести куда угодно:
// пока несёшь, он кричит «ааа». Стрелки на клавиатуре тоже двигают его.
const route = useRoute()
const { t } = useLang()

const spot = computed(() => spots[String(route.name)])
const heroW = ref(0) // на главной котик такого же размера, как был в Hero
const flip = computed(() => (free.value ? faceRight.value : spot.value?.side === 'left'))

const el = ref<HTMLElement | null>(null)
const hop = ref(false)
const { said, sayMood, startScream, stopScream, startChatter, hush } = useCatSpeech(t)
const out = ref(false)
const free = ref(false) // котика уже перетащили: он живёт там, куда его положили
const dragging = ref(false)
const sleepy = ref(false)
const walking = ref(false) // котик неспеша идёт сам
const faceRight = ref(false)
const below = ref(false) // у верхнего края пузырь рисуется под котиком
let sleepTimer = 0
let raf = 0
let moveRaf = 0
let wanderTimer = 0
const player = usePlayer()
let lastReact = 0

// Координаты хранятся обычными переменными и пишутся в style напрямую:
// во время переноса Vue ничего не перерисовывает.
let px = 0
let py = 0
let startX = 0
let startY = 0
let grabX = 0
let grabY = 0
let pressed = false
let moved = false

function say() {
  sayMood('click', 1800)
  jump()
}
function jump() {
  if (reducedMotion()) return
  hop.value = false
  requestAnimationFrame(() => (hop.value = true))
}

// Ленивый котик: если его долго не трогать, он засыпает. Будит клик, перенос или курсор рядом.
function rest() {
  sleepy.value = false
  window.clearTimeout(sleepTimer)
  sleepTimer = window.setTimeout(() => {
    if (!dragging.value) sleepy.value = true
  }, 30000)
}

function place() {
  if (!el.value) return
  el.value.style.transform = `translate3d(${px}px, ${py}px, 0)`
  const nearTop = py < 56
  if (nearTop !== below.value) below.value = nearTop
}
function clamp() {
  const box = el.value
  if (!box) return
  px = Math.min(Math.max(0, px), Math.max(0, window.innerWidth - box.offsetWidth))
  py = Math.min(Math.max(0, py), Math.max(0, window.innerHeight - box.offsetHeight))
}

// Свободная жизнь: котик иногда сам идёт на новое место, очень медленно (около 25 пикселей в секунду).
// Движение делает CSS-transition на transform, то есть без перерисовки страницы.
function toFree() {
  if (free.value || !el.value) return
  const r = el.value.querySelector('img')!.getBoundingClientRect()
  px = r.left
  py = r.top
  free.value = true
  out.value = false
  place()
}
function stopWalk() {
  const box = el.value
  if (!box || !walking.value) return
  const r = box.querySelector('img')!.getBoundingClientRect()
  px = r.left
  py = r.top
  box.style.transition = 'none'
  place()
  walking.value = false
}
function walkTo(x: number, y: number) {
  const box = el.value
  if (!box || reducedMotion()) return
  if (!free.value) {
    // сначала котик переезжает на свободное позиционирование, потом идёт
    toFree()
    void nextTick().then(() => walkTo(x, y))
    return
  }
  const prevX = px
  const prevY = py
  px = x
  py = y
  clamp()
  const dist = Math.hypot(px - prevX, py - prevY)
  if (dist < 20) return
  faceRight.value = px > prevX
  walking.value = true
  box.style.transition = `transform ${Math.max(2.5, dist / 25)}s ease-in-out`
  // кадр, чтобы transition увидел старую позицию
  place()
}
function onWalkEnd(e: TransitionEvent) {
  if (e.target !== el.value || e.propertyName !== 'transform') return
  walking.value = false
  if (el.value) el.value.style.transition = 'none'
}
function wander() {
  window.clearTimeout(wanderTimer)
  wanderTimer = window.setTimeout(
    async () => {
      if (!dragging.value && !sleepy.value && !walking.value && !document.hidden && el.value) {
        toFree()
        await nextTick()
        const dx = (Math.random() - 0.5) * 520
        const dy = (Math.random() - 0.5) * 160
        walkTo(px + dx, Math.max(window.innerHeight * 0.4, py + dy))
      }
      wander()
    },
    11000 + Math.random() * 14000,
  )
}

// Иногда реагирует на клики по странице: поворачивается, спрашивает «мяу?» или подходит поближе.
function onPageDown(e: PointerEvent) {
  const box = el.value
  if (!box || dragging.value || box.contains(e.target as Node)) return
  const now = performance.now()
  if (now - lastReact < 6000 || Math.random() > 0.3) return
  lastReact = now
  rest()
  const r = box.querySelector('img')!.getBoundingClientRect()
  const toRight = e.clientX > r.left + r.width / 2
  const roll = Math.random()
  if (roll < 0.35) {
    if (free.value) faceRight.value = toRight
    jump()
  } else if (roll < 0.7) {
    if (free.value) faceRight.value = toRight
    sayMood('curious', 1700)
  } else {
    // подходит, но не вплотную
    sayMood('curious', 1500)
    const gap = toRight ? -90 : 90
    walkTo(e.clientX + gap - r.width / 2, e.clientY - r.height / 2)
  }
}

function onDown(e: PointerEvent) {
  if (e.button !== 0 || !el.value) return
  const r = el.value.querySelector('img')!.getBoundingClientRect()
  stopWalk()
  pressed = true
  moved = false
  startX = e.clientX
  startY = e.clientY
  grabX = e.clientX - r.left
  grabY = e.clientY - r.top
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  rest()
}

function startDrag() {
  const box = el.value
  if (!box) return
  const r = box.querySelector('img')!.getBoundingClientRect()
  free.value = true
  walking.value = false
  if (el.value) el.value.style.transition = 'none'
  dragging.value = true
  hop.value = false
  out.value = false
  sleepy.value = false
  px = r.left
  py = r.top
  place()
  startScream() // пока несут, котик орёт «ааа»
}

function onMoveDrag(e: PointerEvent) {
  if (!pressed) return
  if (!moved) {
    if (Math.hypot(e.clientX - startX, e.clientY - startY) < 6) return
    moved = true
    startDrag()
  }
  px = e.clientX - grabX
  py = e.clientY - grabY
  if (moveRaf) return
  moveRaf = requestAnimationFrame(() => {
    moveRaf = 0
    clamp()
    place()
  })
}

function onUp() {
  if (!pressed) return
  pressed = false
  if (!moved) return say()
  stopScream()
  cancelAnimationFrame(moveRaf)
  moveRaf = 0
  clamp()
  place()
  dragging.value = false
  sayMood('land', 1600)
  rest()
}

function onKey(e: KeyboardEvent) {
  const dir: Record<string, [number, number]> = {
    ArrowLeft: [-24, 0],
    ArrowRight: [24, 0],
    ArrowUp: [0, -24],
    ArrowDown: [0, 24],
  }
  const d = dir[e.key]
  if (!d || !el.value) return
  e.preventDefault()
  if (!free.value) {
    const r = el.value.querySelector('img')!.getBoundingClientRect()
    px = r.left
    py = r.top
    free.value = true
  }
  px += d[0]
  py += d[1]
  clamp()
  place()
  sayMood('scream', 900)
  rest()
}

function onMove(e: PointerEvent) {
  if (free.value || !el.value || raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    const r = el.value?.getBoundingClientRect()
    if (!r) return
    const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2))
    // «высовывается» с края, когда курсор подошёл ближе; подпрыгивает, когда совсем рядом
    out.value = d < 170
    if (d < 90) {
      if (sleepy.value) rest()
      if (!hop.value) jump()
    }
  })
}

// На главной котик раньше был картинкой в Hero. Теперь это тот же живой котик: он встаёт ровно туда,
// где стояла картинка, а сама картинка прячется. Если его уже куда-то унесли, остаётся где был.
let adoptTries = 0
function adoptHero() {
  const hero = document.querySelector<HTMLElement>('.cat')
  const box = el.value
  if (!hero || !box) {
    if (adoptTries++ < 40) requestAnimationFrame(adoptHero)
    return
  }
  const r = hero.getBoundingClientRect()
  // пока стили не применились, картинка имеет «родные» 342 px — такой размер не берём, ждём
  if (!r.width || r.width > 90) {
    if (adoptTries++ < 40) requestAnimationFrame(adoptHero)
    return
  }
  heroW.value = Math.min(r.width, 68)
  px = r.left
  py = r.top
  free.value = true
  faceRight.value = false
  out.value = false
  void nextTick().then(() => {
    clamp()
    place()
    document.documentElement.classList.add('cat-adopted')
  })
}
function onRoute(name: unknown) {
  if (name !== 'home') {
    heroW.value = 0
    document.documentElement.classList.remove('cat-adopted')
    return
  }
  if (free.value) {
    document.documentElement.classList.add('cat-adopted')
    return
  }
  adoptTries = 0
  void nextTick().then(adoptHero)
}

function onResize() {
  if (!free.value) return
  clamp()
  place()
}

onMounted(() => {
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  window.addEventListener('pointerdown', onPageDown, { passive: true })
  rest()
  wander()
  // время от времени котик бормочет сам; если играет музыка — иногда комментирует её
  startChatter(
    () => !dragging.value && !sleepy.value && !!el.value,
    () => player.playing,
  )
  onRoute(route.name)
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointerdown', onPageDown)
  document.documentElement.classList.remove('cat-adopted')
  window.clearTimeout(wanderTimer)
  cancelAnimationFrame(raf)
  cancelAnimationFrame(moveRaf)
  window.clearTimeout(sleepTimer)
})
watch(
  () => route.name,
  (name) => {
    out.value = false
    hush()
    onRoute(name)
  },
)
</script>

<template>
  <div
    v-if="spot"
    ref="el"
    class="pcat"
    :class="[
      `s-${spot.side}`,
      { peek: spot.peek && !free, out, hop, free, dragging, sleepy, below, walking, flip },
    ]"
    :style="{ bottom: free ? undefined : spot.bottom, width: heroW ? heroW + 'px' : undefined }"
    @transitionend="onWalkEnd"
  >
    <span v-if="said" class="pcat-say" :class="{ scream: dragging }" role="status">{{ said }}</span>
    <span v-else-if="sleepy" class="pcat-say zz" aria-hidden="true">{{ t('cat_zzz') }}</span>
    <button
      type="button"
      class="pcat-btn"
      :aria-label="t('cat_hint')"
      @pointerdown="onDown"
      @pointermove="onMoveDrag"
      @pointerup="onUp"
      @pointercancel="onUp"
      @keydown="onKey"
      @animationend="hop = false"
    >
      <img :src="catUrl" alt="" width="342" height="294" decoding="async" draggable="false" />
    </button>
  </div>
</template>
