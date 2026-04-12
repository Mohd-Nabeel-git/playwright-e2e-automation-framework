import {type Page, type Locator, expect} from '@playwright/test';

export class LoginPage {

    page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goTo(){
        await this.page.goto('https://www.saucedemo.com/',{waitUntil: 'domcontentloaded'});
    }

    async validateSuccessfullLogin(){
        await expect(this.page).toHaveURL(/inventory/, { timeout: 15000 });
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    getErrorMessage(){
        return this.errorMessage;
    }
}