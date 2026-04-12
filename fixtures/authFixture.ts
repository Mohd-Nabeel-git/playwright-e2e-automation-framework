import {test as base, type Page} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import data from '../utils/testData.json';

interface authFixture{
    loggedInPage: Page;
}

export const customTest = base.extend<authFixture>(
    {
        loggedInPage: async ({page}, use) => {
            const loginPage = new LoginPage(page);
            await loginPage.goTo();
            await loginPage.login(data.validCredentials.username, data.validCredentials.password);
            await use(page);
        }
    }
)