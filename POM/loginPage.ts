import { BrowserContext, expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly UsernameField: Locator;
    readonly PasswordField: Locator;

    readonly LoginBtn: Locator;
    readonly ErrorField: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;

        this.UsernameField = this.page.locator("//input[@id='user-name']");
        this.PasswordField = this.page.locator("//input[@id='password']");

        this.LoginBtn = this.page.locator("//input[@id='login-button']");

        this.ErrorField = this.page.locator("h3[data-test='error']");
    }

    async goto() {
        this.page.goto("https://www.saucedemo.com/");
    }

    async loginUser(userName: string, passWord: string) {

        await this.UsernameField.fill(userName);
        await this.PasswordField.fill(passWord);

        await this.LoginBtn.click();
    }

    async verifyLogin() {
        await expect(this.page.url()).toContain("inventory");
        await expect(this.page.locator("#react-burger-menu-btn")).toBeVisible;
        await expect(this.page.locator("//a[@class='shopping_cart_link']")).toBeVisible;
    }

    async verifyLoginWithIncorrectCredentials() {
        
        await expect(this.ErrorField).toBeVisible();
        await expect(this.ErrorField).toHaveText("Epic sadface: Username and password do not match any user in this service");
    }

    async verifyLoginWithEmptyUsername(){

        await expect(this.ErrorField).toBeVisible();
        await expect(this.ErrorField).toHaveText("Epic sadface: Username is required");
    }

    async verifyLoginWithEmptyPassword(){
        await expect(this.ErrorField).toHaveText("Epic sadface: Password is required");

    }
};