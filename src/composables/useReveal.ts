import { onBeforeUnmount, onMounted, type Ref } from 'vue'

// Плавное появление секций при прокрутке. При prefers-reduced-motion — без анимации.
export function useReveal(root: Ref<HTMLElement | null>) {
  let io: IntersectionObserver | null = null

  onMounted(() => {
    const el = root.value
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window))
      return

    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io?.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    el.querySelectorAll('.sec').forEach((s) => {
      s.classList.add('reveal')
      io?.observe(s)
    })
  })

  onBeforeUnmount(() => io?.disconnect())
}
