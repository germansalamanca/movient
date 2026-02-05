import { test, expect } from '@playwright/test'

test.describe('Movie Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for initial data to load
    await expect(page.getByTestId('movies-list')).toBeVisible()
  })

  test('can type into all form fields', async ({ page }) => {
    await page.getByTestId('input-name').fill('The Matrix')
    await page.getByTestId('input-year').fill('1999')
    await page.getByTestId('input-director').fill('Wachowski')

    await expect(page.getByTestId('input-name')).toHaveValue('The Matrix')
    await expect(page.getByTestId('input-year')).toHaveValue('1999')
    await expect(page.getByTestId('input-director')).toHaveValue('Wachowski')
  })

  test('shows autocomplete suggestions when typing director', async ({ page }) => {
    const directorInput = page.getByTestId('input-director')

    // Focus and type partial name
    await directorInput.click()
    await directorInput.fill('Chris')

    // Should show filtered suggestions
    const suggestions = page.getByTestId('director-suggestions')
    await expect(suggestions).toBeVisible()
    await expect(page.getByTestId('suggestion-item')).toHaveCount(1)
    await expect(suggestions).toContainText('Christopher Nolan')
  })

  test('shows all directors when field is focused and empty', async ({ page }) => {
    const directorInput = page.getByTestId('input-director')

    // Just focus the input
    await directorInput.click()

    // Should show all directors
    const suggestions = page.getByTestId('director-suggestions')
    await expect(suggestions).toBeVisible()
    await expect(page.getByTestId('suggestion-item')).toHaveCount(3)
  })

  test('selects suggestion on click', async ({ page }) => {
    const directorInput = page.getByTestId('input-director')

    // Focus and type partial name
    await directorInput.click()
    await directorInput.fill('Bong')

    // Click the suggestion
    await page.getByTestId('suggestion-item').click()

    // Input should have the full name
    await expect(directorInput).toHaveValue('Bong Joon-ho')

    // Suggestions should be hidden
    await expect(page.getByTestId('director-suggestions')).toBeHidden()
  })

  test('submits form and clears fields', async ({ page }) => {
    // Fill out the form
    await page.getByTestId('input-name').fill('The Matrix')
    await page.getByTestId('input-year').fill('1999')
    await page.getByTestId('input-director').fill('Lana Wachowski')

    // Submit
    await page.getByTestId('submit-btn').click()

    // Wait for submission to complete
    await expect(page.getByTestId('submit-btn')).toHaveText('Add Movie')

    // Form should be cleared
    await expect(page.getByTestId('input-name')).toHaveValue('')
    await expect(page.getByTestId('input-year')).toHaveValue('')
    await expect(page.getByTestId('input-director')).toHaveValue('')

    // Movie should appear in the list
    await expect(page.getByTestId('movies-list')).toContainText('The Matrix')
    await expect(page.getByTestId('movies-list')).toContainText('1999')
    await expect(page.getByTestId('movie-item')).toHaveCount(5)
  })
})
