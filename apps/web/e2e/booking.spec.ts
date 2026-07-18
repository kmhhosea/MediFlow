import { test, expect } from '@playwright/test';

test('front desk can book an appointment', async ({ page }) => {
  await page.goto('/sign-in');
  await page.getByLabel('Email').fill('frontdesk@riverside.test');
  await page.getByLabel('Password').fill('Password123!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('/appointments');
  await page.getByRole('button', { name: 'New Appointment' }).click();
  // ... fill form and submit
  await expect(page.getByText('Booked')).toBeVisible();
});
