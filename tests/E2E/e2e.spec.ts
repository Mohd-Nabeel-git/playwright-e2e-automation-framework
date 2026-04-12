import { test, expect } from '@playwright/test';
import data from '../../utils/e2eData.json';
import { PO_Manager } from '../../pages/PO_Manager';

test.use({ storageState: 'storageState.json' });

test.describe('E2E Checkout Flow', () => {
    test('should complete order successfully with valid user data', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'domcontentloaded' });
        const poManager = new PO_Manager(page);
        const inventoryPage = poManager.getInventoryPage();
        await inventoryPage.validateInventoryPage();
        const productDetails = await inventoryPage.getProductDetails(data.productName);
        await inventoryPage.addtoCart(data.productName);
        await inventoryPage.validateCartBadge(1);
        await inventoryPage.goToCart();
        const cartPage = poManager.getCartPage();
        await cartPage.validateCartPage();
        await cartPage.validateAddedProductDetails(productDetails.name!, productDetails.price!);
        await cartPage.goToCheckout();
        const checkoutInformationPage = poManager.getCheckoutInformationPage();
        await checkoutInformationPage.validateCheckoutInformationPage();
        await checkoutInformationPage.fillCheckoutInformation(data.FirstName, data.LastName, data.PostalCode);
        await checkoutInformationPage.goToCheckoutOverview();
        const checkoutOverviewPage = poManager.getCheckoutOverviewPage();
        await checkoutOverviewPage.validateCheckoutOverviewPage();
        await checkoutOverviewPage.validateSelectedProductDetails(productDetails.name!, productDetails.price!);
        const taxAmount = await checkoutOverviewPage.getTaxAmount();
        const itemTotal = await checkoutOverviewPage.getItemTotal();
        await checkoutOverviewPage.validateTotalAmount(itemTotal, taxAmount);
        await checkoutOverviewPage.finishOrder();
        const finishPage = poManager.getFinishPage();
        await finishPage.validateFinishPage();
        await finishPage.validateOrderSuccessMessage();
    });
});