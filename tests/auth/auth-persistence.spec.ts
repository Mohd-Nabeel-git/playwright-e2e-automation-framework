import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('User remains logged in using storage state', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'domcontentloaded' });

  // Validate user is already logged in
  await loginPage.validateSuccessfullLogin();
});