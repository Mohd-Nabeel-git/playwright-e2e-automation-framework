import { type Locator, type Page, expect } from "@playwright/test";

export class InventoryPage {

    page: Page;
    inventory: Locator;
    items: Locator;
    cartBadge: Locator;
    cartLink: Locator;
    productName: Locator;
    productPrice: Locator;

    constructor(page: Page){
        this.page = page;
        this.inventory = page.locator('.inventory_list');
        this.items = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.productName = page.locator('.inventory_item_name');
        this.productPrice = page.locator('.inventory_item_price');
    }
    async goTo(){
        await this.page.goto('https://www.saucedemo.com/inventory.html', {waitUntil: 'domcontentloaded'});
    }

    async validateInventoryPage(){
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/inventory/);
        await expect(this.inventory).toBeVisible();
    }

    async getInventoryProductNames(){
        const names = await this.productName.allTextContents();
        return names;
    }

    async addtoCart(productName: string){
        await this.items.filter({hasText: productName}).getByRole('button', {name: 'Add to cart'}).click();
    }
    async validateCartBadge(expectedCount: number){
        await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }
    async getProductDetails(productName: string){
        const product = this.items.filter({hasText: productName});
        const name = await product.locator('.inventory_item_name').textContent();
        const price = await product.locator('.inventory_item_price').textContent();
        return {name, price};
    }
    async goToCart(){
        await this.cartLink.click();

    }
}