import { type Page, type Locator, expect } from "@playwright/test";

export class CheckoutOverviewPage {

    page: Page;
    selectedItemsSection: Locator;
    selectedItems: Locator;
    tax: Locator;
    itemTotal: Locator;
    total: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectedItemsSection = page.locator('.cart_list');
        this.selectedItems = page.locator('.cart_item');
        this.tax = page.locator('[data-test="tax-label"]');
        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.total = page.locator('[data-test="total-label"]');
    }
    async validateCheckoutOverviewPage() {
        await expect(this.page).toHaveURL(/checkout-step-two/);
        await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
        await expect(this.selectedItemsSection).toBeVisible();
    }
    async validateSelectedProductDetails(productName: string, productPrice: string) {
        const productItem = this.selectedItems.filter({ hasText: productName });
        await expect(productItem).toBeVisible();
        await expect(productItem.locator('.inventory_item_name')).toHaveText(productName);
        await expect(productItem.locator('.inventory_item_price')).toHaveText(productPrice);
    }
    async getTaxAmount() {
        await expect(this.tax).toBeVisible();
        const data = await this.tax.textContent();
        const taxAmount = data?.split('$')[1];
        const tax = parseFloat(taxAmount!);
        return tax
    }
    async getItemTotal() {
        await expect(this.itemTotal).toBeVisible();
        const data = await this.itemTotal.textContent();
        const itemTotalAmount = data?.split('$')[1];
        const itemTotal = parseFloat(itemTotalAmount!);
        return itemTotal;
    }
    async validateTotalAmount(itemTotal: number, tax: number) {
        await expect(this.total).toBeVisible();
        const totalAmount = itemTotal + tax;
        const totalText = await this.total.textContent();
        const totalAmountDisplayed = totalText?.split('$')[1];
        expect(parseFloat(totalAmountDisplayed!)).toBeCloseTo(totalAmount, 2);

    }
    async finishOrder(){
        await this.page.getByRole('button', {name: 'Finish'}).click();
    }
}