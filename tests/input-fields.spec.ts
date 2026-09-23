import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Input fields', async ({ page }) => {

  //Select PET TYPES menu items in the navigation bar
  await page.getByRole('link', { name: 'Pet Types' }).click()
  await expect(page.getByRole('heading', { name: 'Pet Types' })).toBeVisible()
  await page.waitForTimeout(500)

  //Click on edit button for cat
  await page.getByRole('button', { name: 'Edit' }).first().click()
  await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible()
  await page.waitForTimeout(2000)

  //Change the pet type name from "cat" to "rabbit" and click "Update" button
  await page.locator('#name').fill('rabbit')
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Update' }).click()
  await page.waitForTimeout(2000)

  //Add the assertion that the first pet type in the list of types has a value "rabbit" 
 await expect(page.locator('input[id="0"]')).toHaveValue('rabbit')
 

  //Click on "Edit" button for the same "rabbit" pet type
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: 'Edit' }).first().click()
  await page.waitForTimeout(500)
  await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible()

  //Change the pet type name back from "rabbit" to "cat" and click "Update" button
  await page.locator('#name').fill('cat')
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: 'Update' }).click()
  await page.waitForTimeout(1000)
  await expect(page.locator('input[id="0"]')).toHaveValue('cat')
});