import { type Page, type Locator, expect } from "@playwright/test";

export class CheckoutInformationPage {

    page: Page;
    errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.errorMessage = this.page.locator('[data-test="error"]');  
    } 

    async goTo() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html', {waitUntil: 'domcontentloaded'});
    }

    async validateCheckoutInformationPage() {
        await expect(this.page).toHaveURL(/checkout-step-one/);
        await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.getByPlaceholder('First Name').fill(firstName);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
    }

    async validateErrorMessage(expectedMessage: string) {
        await expect(this.page).toHaveURL(/checkout-step-one/);
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    async goToCheckoutOverview(){
        await this.page.getByRole('button', {name: 'Continue'}).click();
    }

    async validateSuccessfulNavigationToCheckoutOverview(){
        await expect(this.page).toHaveURL(/checkout-step-two/);
    }
}