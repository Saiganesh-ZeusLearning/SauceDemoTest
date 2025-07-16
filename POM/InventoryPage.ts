import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import { AppURLs, SortType } from "../testConfig";

export class InventoryPage {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly cartBtn: Locator;
    readonly cartBadge: Locator;
    readonly addToCartBtnList: Locator;
    readonly removeItemBtnList: Locator;

    readonly sortBySelector: Locator;

    readonly hamburgerOpenBtn: Locator;
    readonly hamburgerCloseBtn: Locator;
    readonly sidebarAllItems: Locator;
    readonly sidebarAbout: Locator;
    readonly sidebarLogout: Locator;
    readonly sidebarResetAppState: Locator;


    readonly titleListOfEachCard: Locator;
    readonly priceListOfEachCard: Locator;

    constructor(page: Page) {
        this.page = page;

        this.sortBySelector = this.page.locator("[data-test='product-sort-container']");

        this.cartBtn = this.page.locator("[data-test='shopping-cart-link']");
        this.cartBadge = this.page.locator("[data-test='shopping-cart-badge']");

        this.hamburgerOpenBtn = this.page.locator('#react-burger-menu-btn');
        this.hamburgerCloseBtn = this.page.locator('#react-burger-cross-btn');

        this.sidebarAllItems = this.page.locator("[data-test='inventory-sidebar-link']");
        this.sidebarAbout = this.page.locator("[data-test='about-sidebar-link']");
        this.sidebarLogout = this.page.locator("[data-test='logout-sidebar-link']")
        this.sidebarResetAppState = this.page.locator("[data-test='reset-sidebar-link']");

        this.addToCartBtnList = this.page.locator('button:text-is("Add to cart")');
        this.removeItemBtnList = this.page.locator('button:text-is("Remove")');

        this.titleListOfEachCard = this.page.locator("//a[contains(@data-test,'title-link')]");
        this.priceListOfEachCard = this.page.locator("//div[contains(@data-test,'inventory-item-price')]");

    }

    async clickOnAddToCart(index: number) {
        await this.addToCartBtnList.nth(index).click();
    }

    async clickOnRemoveItem(index: number) {
        await this.removeItemBtnList.nth(index).click();
    }

    async clickOnHamburgerOpenBtn() {
        await this.hamburgerOpenBtn.click();
    }

    async clickOnHamburgerAboutBtn() {
        await this.sidebarAbout.click();
    }

    async clickOnHamburgerLogoutBtn() {
        await this.sidebarLogout.click();
    }

    async clickOnHamburgerResetStateBtn() {
        await this.sidebarResetAppState.click();
    }

    async clickOnHamburgerCloseBtn() {
        await this.hamburgerCloseBtn.click();
    }

    async verifyHamburgerWorking() {
        await expect(this.sidebarAllItems).toBeVisible();
        await expect(this.sidebarAbout).toBeVisible();
        await expect(this.sidebarLogout).toBeVisible();
        await expect(this.sidebarResetAppState).toBeVisible();
        await expect(this.hamburgerCloseBtn).toBeVisible();
    }

    async verifyHamburgerAboutBtnWorking() {
        await expect(this.page).toHaveURL(AppURLs.aboutPage);
    }

    async verifyHamburgerLogoutBtnWorking() {
        await expect(this.page).toHaveURL(AppURLs.base);
        await expect(this.page.locator("//input[@id='user-name']")).toBeVisible();
        await expect(this.page.locator("//input[@id='password']")).toBeVisible();
    }

    async verifyCartBadgeCount(badgeCount: string) {
        if (badgeCount !== "")
            await expect(this.cartBadge).toHaveText(badgeCount, { timeout: 5000 });
        else
            await expect(this.cartBadge).toBeHidden();
    }

    async verifyAddToCartBtn() {
        await expect(this.cartBadge).toBeVisible();
        await expect(this.removeItemBtnList.first()).toBeVisible();
    }

    async sortBy(value){
        switch (value) {
            case SortType.Az:
                await this.sortBySelector.selectOption("az");
                break;
            case SortType.Za:
                await this.sortBySelector.selectOption("za");
                break;
            case SortType.LowToHigh:
                await this.sortBySelector.selectOption("lohi");
                break;
            case SortType.HighToLow:
                await this.sortBySelector.selectOption("hilo");
                break;
        
            default:
                break;
        }
    }

    async verifyTitleSort(expectedOrder: 'asc' | 'desc') {
        const titles: string[] = [];

        for (let i = 0; i < await this.titleListOfEachCard.count(); i++) {
            const title = await this.titleListOfEachCard.nth(i).textContent();
            if (title) titles.push(title.trim());
        }

        const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));

        if (expectedOrder === 'desc') sortedTitles.reverse();

        expect(titles).toEqual(sortedTitles);
    }


    async verifyPriceSort(expectedOrder: 'asc' | 'desc') {
        const count = await this.priceListOfEachCard.count();

        for (let i = 0; i < count - 1; i++) {
            const rawPrice = await this.priceListOfEachCard.nth(i).textContent();
            expect(rawPrice).not.toBeNull();
            const price = parseFloat(rawPrice!.replace('$', ''));

            const rawNextPrice = await this.priceListOfEachCard.nth(i + 1).textContent();
            expect(rawNextPrice).not.toBeNull();
            const nextPrice = parseFloat(rawNextPrice!.replace('$', ''));
            if (expectedOrder === 'asc')
                await expect(price).toBeLessThanOrEqual(nextPrice);
            else
                await expect(price).toBeGreaterThanOrEqual(nextPrice);

        }
    }
}