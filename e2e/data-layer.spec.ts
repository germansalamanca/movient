import { test, expect } from '@playwright/test'

test.describe('Data Layer', () => {
  test('loads and displays movies', async ({ page }) => {
    await page.goto('/')

    // Wait for movies to load
    await expect(page.getByTestId('movies-list')).toBeVisible()

    // Verify movies are displayed
    const movieItems = page.getByTestId('movie-item')
    await expect(movieItems).toHaveCount(4)
    await expect(movieItems.first()).toContainText('Inception')
  })

  test('can add a new movie via form', async ({ page }) => {
    await page.goto('/')

    // Wait for initial load
    await expect(page.getByTestId('movies-list')).toBeVisible()
    await expect(page.getByTestId('movie-item')).toHaveCount(4)

    // Fill and submit form
    await page.getByTestId('input-name').fill('Kill Bill')
    await page.getByTestId('input-year').fill('2003')
    await page.getByTestId('input-director').fill('Quentin Tarantino')
    await page.getByTestId('submit-btn').click()

    // Wait for submission
    await expect(page.getByTestId('submit-btn')).toHaveText('Add Movie')

    // Should now have 5 movies
    await expect(page.getByTestId('movie-item')).toHaveCount(5)
    await expect(page.getByTestId('movies-list')).toContainText('Kill Bill')
  })
})
