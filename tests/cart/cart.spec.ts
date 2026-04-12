import { test, expect } from '@playwright/test';
import { PO_Manager } from '../../pages/PO_Manager';

test.use({ storageState: 'storageState.json' });

async function addMultipleProductsToCart(inventoryPage: any, productNames: string[]) {
    let productDetailsList: { name: string | null ; price: string | null }[] = [];
    let expectedCartCount = 0;
    for (const product of productNames) {
        await inventoryPage.addtoCart(product);
        const productDetails = await inventoryPage.getProductDetails(product);
        productDetailsList.push(productDetails);
        expectedCartCount++;
    }
    return { productDetailsList, expectedCartCount };
}

test.describe('Cart Features', () => {
    test.describe.configure({ mode: 'parallel' });
    test.describe('Single Item Cart Behavior', () => {
        test(`Should add and remove a single item`, async ({ page }) => {
            const poManager = new PO_Manager(page);
            const inventoryPage = poManager.getInventoryPage();
            await inventoryPage.goTo();
            await inventoryPage.validateInventoryPage();
            const products = await inventoryPage.getInventoryProductNames();
            const productDetails = await inventoryPage.getProductDetails(products[0]);
            await inventoryPage.addtoCart(products[0]);
            await inventoryPage.validateCartBadge(1);
            await inventoryPage.goToCart();
            const cartPage = poManager.getCartPage();
            await cartPage.validateCartPage();
            await cartPage.validateAddedProductDetails(productDetails.name!, productDetails.price!);
            await cartPage.removeProduct(products[0]);
            await cartPage.validateItemRemoved(products[0]);
            await cartPage.validateCartBadge(0);
        });
    });

    test.describe('Multiple Items Cart Behavior', () => {
        test(`Should add and remove multiple items`, async ({ page }) => {
            const poManager = new PO_Manager(page);
            const inventoryPage = poManager.getInventoryPage();
            await inventoryPage.goTo();
            await inventoryPage.validateInventoryPage();
            const products = await inventoryPage.getInventoryProductNames();
            const selectedProducts = products.slice(0, 3);
            const { productDetailsList, expectedCartCount } = await addMultipleProductsToCart(inventoryPage, selectedProducts);
            await inventoryPage.validateCartBadge(expectedCartCount);
            await inventoryPage.goToCart();
            const cartPage = poManager.getCartPage();
            await cartPage.validateCartPage();
            for (const productDetails of productDetailsList) {
                await cartPage.validateAddedProductDetails(productDetails.name!, productDetails.price!);
            }
            await cartPage.validateCorrectItemsCount(expectedCartCount);
        });
    });

    test.describe('removing a single item from multiple items in cart', () => {
        test(`Should remove a single item from multiple items in cart`, async ({ page }) => {
            const poManager = new PO_Manager(page);
            const inventoryPage = poManager.getInventoryPage();
            await inventoryPage.goTo();
            await inventoryPage.validateInventoryPage();
            const products = await inventoryPage.getInventoryProductNames();
            const selectedProducts = products.slice(0, 3);
            const { expectedCartCount } = await addMultipleProductsToCart(inventoryPage, selectedProducts);
            await inventoryPage.validateCartBadge(expectedCartCount);
            await inventoryPage.goToCart();
            const cartPage = poManager.getCartPage();
            await cartPage.validateCartPage();
            const productToRemove = selectedProducts[1];
            await cartPage.removeProduct(productToRemove);
            await cartPage.validateItemRemoved(productToRemove);
            await cartPage.validateCartBadge(expectedCartCount - 1);
            const remainingProductsList = selectedProducts.filter(product => product !== productToRemove);
            await cartPage.validateCorrectItemsCount(remainingProductsList.length);
            for (const products of remainingProductsList) {
                await cartPage.validateRemainingItems(products);
            }
        });
    });

    test.describe('removing all items from cart', () => {
        test(`Should remove all items from cart`, async ({ page }) => {
            const poManager = new PO_Manager(page);
            const inventoryPage = poManager.getInventoryPage();
            await inventoryPage.goTo();
            await inventoryPage.validateInventoryPage();
            const products = await inventoryPage.getInventoryProductNames();
            const selectedProducts = products.slice(0, 3);
            const { expectedCartCount } = await addMultipleProductsToCart(inventoryPage, selectedProducts);
            await inventoryPage.validateCartBadge(expectedCartCount);
            await inventoryPage.goToCart();
            const cartPage = poManager.getCartPage();
            await cartPage.validateCartPage();
            for (const product of selectedProducts) {
                await cartPage.removeProduct(product);
                await cartPage.validateItemRemoved(product);
            }
            await cartPage.validateCartBadge(0);
            await cartPage.validateCorrectItemsCount(0);
        });
    });
});