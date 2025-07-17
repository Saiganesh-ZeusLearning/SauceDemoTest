import { expect, Locator, Page } from "@playwright/test";
import { AppURLs } from "../testConfig";

export class LoginPage {
    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;

    readonly loginButton: Locator;
    readonly errorMessageText: Locator;

    readonly menuButton: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = this.page.locator('[data-test="username"]');
        this.passwordInput = this.page.locator('[data-test="password"]');

        this.loginButton = this.page.locator("[data-test='login-button']");

        this.errorMessageText = this.page.locator("[data-test='error']");

        this.menuButton = this.page.locator("#react-burger-menu-btn");
        this.cartLink = this.page.locator("[data-test='shopping-cart-link']");
    }

    async goto(url = AppURLs.base): Promise<void> {
        await this.page.goto(url);
    }

    async loginUser(userName: string, passWord: string): Promise<void> {

        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(passWord);

        await this.loginButton.click();
    }

    async verifyLogin(): Promise<void> {
        await expect(this.page).toHaveURL(/.*inventory.*/);
        await expect(this.menuButton).toBeVisible();
        await expect(this.cartLink).toBeVisible();
    }

    async verifyLoginErrorMessage(expectedMessage: string): Promise<void>{
        await expect(this.errorMessageText).toBeVisible();
        await expect(this.errorMessageText).toHaveText(expectedMessage);
    }

    async restrictUserToAccessInventoryWithoutLogin(): Promise<void>{
        await expect(this.errorMessageText).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
    }

    async restrictUserToAccessCartWithoutLogin(): Promise<void>{
        await expect(this.errorMessageText).toHaveText("Epic sadface: You can only access '/cart.html' when you are logged in.");
    }
};