import { test, expect } from '@playwright/test';
import { PO_Manager } from '../../pages/PO_Manager';
import testData from '../../utils/negativeTestData.json';

test.use({ storageState: 'storageState.json' });

test.describe('Checkout Negative Scenarios', () => {
    test.describe.configure({ mode: 'parallel' });
    for (const data of testData) {
        test(`Checkout validation: ${data.scenario}`, async ({ page }) => {
            const poManager = new PO_Manager(page);
            const checkoutInformationPage = poManager.getCheckoutInformationPage();
            await checkoutInformationPage.goTo();
            await checkoutInformationPage.validateCheckoutInformationPage();
            await checkoutInformationPage.fillCheckoutInformation(data.firstName, data.lastName, data.postalCode);
            await checkoutInformationPage.goToCheckoutOverview();
            if (data.error) {
                await checkoutInformationPage.validateErrorMessage(data.error);
            } else {
                await checkoutInformationPage.validateSuccessfulNavigationToCheckoutOverview();
            }
        });
    }
});