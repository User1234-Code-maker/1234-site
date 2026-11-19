import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// секции ниже первого экрана грузятся лениво — пролистываем страницу до конца, чтобы они появились
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y <= document.documentElement.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.locator('#contact h2').waitFor()
}

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1100 },
  { name: 'mobile', width: 390, height: 844 },
]

for (const vp of viewports) {
  test.describe(vp.name, () => {
    test.use({ viewport: { width: vp.width, height: vp.height }, reducedMotion: 'reduce' })

    test('нет горизонтального скролла и ошибок в консоли', async ({ page }) => {
      const errors: string[] = []
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
      page.on('pageerror', (e) => errors.push(String(e)))
      await page.goto('/')
      await expect(page.locator('h1')).toBeVisible()
      await scrollThrough(page)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
      expect(errors).toEqual([])
    })

    test('нет нарушений доступности (axe)', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('h1')).toBeVisible()
      await scrollThrough(page)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
      expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([])
    })
  })
}

test('переключатель языка меняет заголовок', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'RU' }).click()
  await expect(page.locator('h1')).toContainText('Фуллстек-разработчик')
  await page.reload()
  await expect(page.locator('h1')).toContainText('Фуллстек-разработчик')
})

test('ссылка SoundCloud ведёт на настоящий адрес', async ({ page }) => {
  await page.goto('/')
  const href = await page.getByRole('link', { name: 'SoundCloud' }).first().getAttribute('href')
  expect(href).toContain('soundcloud.com')
})

test('карточка проекта содержит ссылки на код и демо', async ({ page }) => {
  await page.goto('/')
  await scrollThrough(page)
  const card = page.locator('.card', { hasText: 'Game Studio Website' })
  await expect(card.getByRole('link')).toHaveCount(2)
})

test('нижние секции не грузятся, пока не подъехали к экрану', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('#contact h2')).toHaveCount(0)
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await expect(page.locator('#contact h2')).toBeVisible()
})

test('кот не заходит на японскую плашку на разных размерах окна', async ({ page }) => {
  const sizes = [
    [1920, 1080],
    [1440, 700],
    [1366, 768],
    [1280, 720],
    [820, 1100],
    [390, 844],
    [360, 640],
  ]
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height })
    await page.goto('/')
    const jp = await page.locator('.jp').boundingBox()
    const cat = await page.locator('.cat').boundingBox()
    expect(cat!.y, `${width}x${height}`).toBeGreaterThanOrEqual(jp!.y + jp!.height + 8)
  }
})
