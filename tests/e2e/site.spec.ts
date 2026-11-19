import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

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
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
      expect(errors).toEqual([])
    })

    test('нет нарушений доступности (axe)', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('h1')).toBeVisible()
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
  const card = page.locator('.card', { hasText: 'Game Studio Website' })
  await expect(card.getByRole('link')).toHaveCount(2)
})
