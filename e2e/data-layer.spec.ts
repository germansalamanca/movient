import { test, expect } from '@playwright/test'

test.describe('Data Layer', () => {
  test('loads and displays movies', async ({ page }) => {
    await page.goto('/')

    // Wait for loading to finish
    await expect(page.getByTestId('loading')).toBeVisible()
    await expect(page.getByTestId('loading')).toBeHidden()

    // Verify movies are displayed
    const movieItems = page.getByTestId('movie-item')
    await expect(movieItems).toHaveCount(4)
    await expect(movieItems.first()).toContainText('Inception')
  })

  test('displays unique directors', async ({ page }) => {
    await page.goto('/')

    // Wait for data to load
    await expect(page.getByTestId('loading')).toBeHidden()

    // Should have 3 unique directors (Nolan appears twice in movies)
    const directorItems = page.getByTestId('director-item')
    await expect(directorItems).toHaveCount(3)
  })

  test('can add a new movie', async ({ page }) => {
    await page.goto('/')

    // Wait for initial load
    await expect(page.getByTestId('loading')).toBeHidden()

    // Click add button
    await page.getByTestId('add-movie-btn').click()

    // Wait for loading to finish
    await expect(page.getByTestId('loading')).toBeHidden()

    // Should now have 5 movies
    const movieItems = page.getByTestId('movie-item')
    await expect(movieItems).toHaveCount(5)

    // New movie should be in the list
    await expect(page.getByTestId('movies-list')).toContainText('Kill Bill')
  })
})
