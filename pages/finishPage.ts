import {type Page, Locator, expect} from '@playwright/test';

export class FinishPage {

    page: Page;
    orderConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderConfirmation = page.locator('.complete-header');
    }
    async validateFinishPage() {
        await expect(this.page).toHaveURL(/checkout-complete/);
        await expect(this.page.getByText('Checkout: Complete!')).toBeVisible();
    }

    async validateOrderSuccessMessage() {
        await expect(this.orderConfirmation).toBeVisible();
    }
}