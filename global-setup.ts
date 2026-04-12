import { chromium } from '@playwright/test';
import data from './utils/testData.json';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', data.validCredentials.username);
  await page.fill('#password', data.validCredentials.password);
  await page.click('#login-button');

  // wait for login success
  await page.waitForURL('**/inventory.html');

  // save storage state
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;