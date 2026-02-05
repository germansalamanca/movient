import { test, expect } from '@playwright/test'

test('app loads with Hello Movient', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('h1')).toContainText('Hello Movient')
  await expect(page.locator('p')).toContainText('Your movie tracking companion')
})
