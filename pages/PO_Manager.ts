import { type Page, expect } from "@playwright/test";
import { InventoryPage } from "./InventoryPage";
import { CartPage } from "./CartPage";
import { CheckoutInformationPage } from "./CheckoutInformationPage";
import { CheckoutOverviewPage } from "./CheckoutOverviewPage";
import { FinishPage } from "./finishPage";


export class PO_Manager {

    page: Page;
    inventoryPage: InventoryPage;
    cartPage: CartPage
    checkoutInformationPage: CheckoutInformationPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    finishPage: FinishPage;

    constructor(page: Page) {
        this.page = page;
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutInformationPage = new CheckoutInformationPage(page);
        this.checkoutOverviewPage = new CheckoutOverviewPage(page);
        this.finishPage = new FinishPage(page);
    }
    getInventoryPage() {
        return this.inventoryPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckoutInformationPage() {
        return this.checkoutInformationPage;
    }
    getCheckoutOverviewPage() {
        return this.checkoutOverviewPage;
    }
    getFinishPage() {
        return this.finishPage;
    }
}
