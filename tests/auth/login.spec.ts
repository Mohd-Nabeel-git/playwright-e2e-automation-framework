import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import dataset from '../../utils/testData.json' ;

test.use({ storageState: undefined });


test('Valid login', async ({page})=>{
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login(dataset.validCredentials.username, dataset.validCredentials.password);
  await loginPage.validateSuccessfullLogin();
})

test('Invalid login', async ({page})=>{
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login(dataset.invalidCredentials.username, dataset.invalidCredentials.password);
  await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
})

test('Locked out user login', async ({page})=>{
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.login(dataset.lockedOutUser.username, dataset.lockedOutUser.password);
  await expect(loginPage.getErrorMessage()).toContainText('locked out');
})
