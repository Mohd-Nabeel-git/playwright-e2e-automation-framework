import { type Locator, type Page, expect } from "@playwright/test";
import { parse } from "node:path";

export class CartPage {

    page: Page;
    cartItemsSection: Locator;
    cartItems: Locator;
    cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemsSection = page.locator('.cart_list');
        this.cartItems = page.locator('.cart_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }
    async goTo() {
        await this.page.goto('https://www.saucedemo.com/cart.html', {waitUntil: 'domcontentloaded'});
    }

    async validateCartPage() {
        await expect(this.page).toHaveURL(/cart/);
        await expect(this.cartItemsSection).toBeVisible();
    }

    async validateAddedProductDetails(productName: string, productPrice: string) {
        const productItem = this.cartItems.filter({ hasText: productName });
        await expect(productItem).toBeVisible();
        await expect(productItem.locator('.inventory_item_name')).toHaveText(productName);
        await expect(productItem.locator('.inventory_item_price')).toHaveText(productPrice);
    }

    async removeProduct(productName: string) {
        const productItem = this.cartItems.filter({ hasText: productName });
        await productItem.getByRole('button', { name: 'Remove' }).click();
    }

    async validateItemRemoved(productName: string) {
        const productItem = this.cartItems.filter({ hasText: productName });
        await expect(productItem).toHaveCount(0);
    }

    async validateRemainingItems(productNames: string) {
        const productItem = this.cartItems.filter({ hasText: productNames });
        await expect(productItem).toBeVisible();
        await expect(productItem.locator('.inventory_item_name')).toHaveText(productNames);
    }

    async validateCartBadge(expectedCount: number) {
        if(expectedCount > 0){
            await expect(this.cartBadge).toHaveText(expectedCount.toString());
        }else{
            await expect(this.cartBadge).toBeHidden();
        }
    }

    async validateCorrectItemsCount(expectedCount: number) {
        await expect(this.cartItems).toHaveCount(expectedCount);
    }

    async goToCheckout(){
        await this.page.getByRole('button', {name: 'Checkout'}).click();
    }
}