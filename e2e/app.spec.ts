import { test, expect } from '@playwright/test'

test('app loads with Movient header', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('h1')).toContainText('Movient')
  await expect(page.getByText('Track your favorite movies')).toBeVisible()
})
