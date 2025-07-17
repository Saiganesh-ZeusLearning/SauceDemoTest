import { SortType } from "../testConfig";
import { test } from "../PomFixture/pomFixture";

test.describe("Inventory page testing", () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.loginUser("standard_user", "secret_sauce");
    })

    test("Functionality of Hamburger Button", async ({ inventoryPage }) => {
        await inventoryPage.clickOnHamburgerOpenBtn();
        await inventoryPage.verifyHamburgerWorking();
    })

    test("Functionality of Hamburger About Button", async ({ inventoryPage }) => {
        await inventoryPage.clickOnHamburgerOpenBtn();
        await inventoryPage.clickOnHamburgerAboutBtn();
        await inventoryPage.verifyHamburgerAboutBtnWorking();
    })

    test("Functionality of Hamburger Logout Button", async ({ inventoryPage }) => {
        await inventoryPage.clickOnHamburgerOpenBtn();
        await inventoryPage.clickOnHamburgerLogoutBtn();
        await inventoryPage.verifyHamburgerLogoutBtnWorking();
    })

    test("should add item to cart and display correct cart badge count", async ({ inventoryPage }) => {
        await inventoryPage.clickOnAddToCart(1);
        await inventoryPage.verifyCartBadgeCount("1");
    })
    test("should reset cart when Reset App State is clicked", async ({ inventoryPage }) => {
        await inventoryPage.clickOnAddToCart(1);
        await inventoryPage.verifyCartBadgeCount("1");
        await inventoryPage.clickOnHamburgerOpenBtn();
        await inventoryPage.clickOnHamburgerResetStateBtn();
        await inventoryPage.clickOnHamburgerCloseBtn();
        await inventoryPage.verifyCartBadgeCount("");
    })

    test("should add Item to the cart", async ({ inventoryPage }) => {
        await inventoryPage.clickOnAddToCart(1);
        await inventoryPage.verifyAddToCartBtn();
    })

    test("should count items of Cart ", async ({ inventoryPage }) => {
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
        test(`should sort items from ${sort.label}`, async ({ inventoryPage }) => {
            await inventoryPage.sortBy(sort.value);
            await inventoryPage.verifyTitleSort(sort.expected)
        })
    })

    const sortingOptionsByPrice = [
        { label: 'Low to High', value: SortType.LowToHigh, expected: 'asc' },
        { label: 'High to Low', value: SortType.HighToLow, expected: 'desc' },
    ] as const;

    sortingOptionsByPrice.forEach((sort) => {
        test(`should sort items from ${sort.label}`, async ({ inventoryPage }) => {
            await inventoryPage.sortBy(sort.value);
            await inventoryPage.verifyPriceSort(sort.expected)
        })
    })

})