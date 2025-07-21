import { expect, Locator, Page } from "@playwright/test";
import { SauceDemoTestData } from "../../testdata/sauceDemo.testData";

export class LoginPage {
    readonly page: Page;
    readonly sdTestData: SauceDemoTestData;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;

    readonly loginButton: Locator;
    readonly errorMessageText: Locator;

    readonly menuButton: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sdTestData = new SauceDemoTestData();

        this.usernameInput = this.page.locator('[data-test="username"]');
        this.passwordInput = this.page.locator('[data-test="password"]');

        this.loginButton = this.page.locator("[data-test='login-button']");

        this.errorMessageText = this.page.locator("[data-test='error']");

        this.menuButton = this.page.locator("#react-burger-menu-btn");
        this.cartLink = this.page.locator("[data-test='shopping-cart-link']");
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
        await expect(this.errorMessageText).toHaveText(this.sdTestData.ErrorMessages.restrictUserFromAccessingInventory);
    }

    async restrictUserToAccessCartWithoutLogin(): Promise<void>{
        await expect(this.errorMessageText).toHaveText(this.sdTestData.ErrorMessages.restrictUserFromAccessingCart);
    }
};