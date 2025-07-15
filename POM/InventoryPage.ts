import { BrowserContext, Locator, Page } from "@playwright/test";

class InventoryPage{
    readonly page: Page;
    readonly context: BrowserContext;

    readonly hamburgerBtn: Locator;
    readonly cartBtn: Locator;
    readonly sortBySelector: Locator;

    readonly cartBadge: Locator;

    readonly sidebarAllItems: Locator;
    readonly sidebarAbout: Locator;
    readonly sidebarLogout: Locator;
    readonly sidebarResetAppState: Locator;

    constructor(page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;

        this.hamburgerBtn = this.page.locator("//button[@id='react-burger-menu-btn']");
        this.cartBtn = this.page.locator("//a[@class='shopping_cart_link']");
        this.sortBySelector = this.page.locator("//select[@class='product_sort_container']");

        this.cartBadge = this.page.locator("//span[@class='shopping_cart_badge']");

        this.sidebarAllItems = this.page.locator("//a[@id='inventory_sidebar_link']");
        this.sidebarAbout = this.page.locator("//a[@id='about_sidebar_link']");
        this.sidebarLogout = this.page.locator("//a[@id='logout_sidebar_link']")
        this.sidebarResetAppState = this.page.locator("//a[@id='reset_sidebar_link']");

    }

    async clickOnAddToCart(btnIndex: number){
        const addToCartBtn = this.page.locator(`(//button[contains(text(), 'Add to cart')])[${btnIndex}]`)
        addToCartBtn.click();
    }

    async clickOnRemoveItem(btnIndex: number){
        const removeItemBtn = this.page.locator(`(//button[contains(text(), 'Remove')])[${btnIndex}]`)
        removeItemBtn.click();
    }


    async clickOnHamburgerBtn(){
        this.hamburgerBtn.click();
    }

    async clickOnsortBySelector(){
        this.sortBySelector.click();
    }
}