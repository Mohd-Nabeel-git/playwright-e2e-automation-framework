import {expect} from '@playwright/test';
import {customTest} from '../../fixtures/authFixture';

customTest.use({ storageState: undefined });

customTest('Already logged in through fixture', async({loggedInPage})=>{
  await expect(loggedInPage).toHaveURL(/inventory/);
})