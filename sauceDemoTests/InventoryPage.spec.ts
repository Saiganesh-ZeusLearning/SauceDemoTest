import test from "@playwright/test";
import { LoginPage } from "../POM/loginPage";
import { InventoryPage } from "../POM/InventoryPage";
import { SortType } from "../testConfig";

let inventoryPage: InventoryPage;

test.describe("Inventory page testing", () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        await loginPage.loginUser("standard_user", "secret_sauce");

        inventoryPage = new InventoryPage(page);
    })

    test("Functionality of Hamburger Button", async () => {
        await inventoryPage.clickOnHamburgerOpenBtn();
        await inventoryPage.verifyHamburgerWorking();
    })

    test("Functionality of Hamburger About Button", async () => {
        await inventoryPage.clickOnHamburgerOpenBtn();
        await inventoryPage.clickOnHamburgerAboutBtn();
        await inventoryPage.verifyHamburgerAboutBtnWorking();
    })

    test("Functionality of Hamburger Logout Button", async () => {
        await inventoryPage.clickOnHamburgerOpenBtn();
        await inventoryPage.clickOnHamburgerLogoutBtn();
        await inventoryPage.verifyHamburgerLogoutBtnWorking();
    })

    test("should add item to cart and display correct cart badge count", async () => {
        await inventoryPage.clickOnAddToCart(1);
        await inventoryPage.verifyCartBadgeCount("1");
    })
    test("should reset cart when Reset App State is clicked", async () => {
        await inventoryPage.clickOnAddToCart(1);
        await inventoryPage.verifyCartBadgeCount("1");
        await inventoryPage.clickOnHamburgerOpenBtn();
        await inventoryPage.clickOnHamburgerResetStateBtn();
        await inventoryPage.clickOnHamburgerCloseBtn();
        await inventoryPage.verifyCartBadgeCount("");
    })

    test("should add Item to the cart", async () => {
        await inventoryPage.clickOnAddToCart(1);
        await inventoryPage.verifyAddToCartBtn();
    })

    test("should count items of Cart ", async () => {
        for (let i = 0; i < 3; i++) {
            await inventoryPage.clickOnAddToCart(i);
        }
        await inventoryPage.verifyCartBadgeCount("3");
    })

    const sortingOptionsByTitle = [
        { label: 'A to Z', value: SortType.Az, expected: "asc" },
        { label: 'Z to A', value: SortType.Za, expected: "desc" },
    ] as const;

    sortingOptionsByTitle.forEach((sort) => {
        test(`should sort items from ${sort.label}`, async () => {
            await inventoryPage.sortBy(sort.value);
            await inventoryPage.verifyTitleSort(sort.expected)
        })
    })

    const sortingOptionsByPrice = [
        { label: 'Low to High', value: SortType.LowToHigh, expected: 'asc' },
        { label: 'High to Low', value: SortType.HighToLow, expected: 'desc' },
    ] as const;

    sortingOptionsByPrice.forEach((sort) => {
        test(`should sort items from ${sort.label}`, async () => {
            await inventoryPage.sortBy(sort.value);
            await inventoryPage.verifyPriceSort(sort.expected)
        })
    })

})