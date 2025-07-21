import { Page } from "@playwright/test";
import { test } from "../fixtures/pomFixture";
import { SauceDemoTestData } from "../fixtures/testdata/sauceDemo.testData";
import { SauceDemoCommonFuctions } from "../fixtures/commonFunctions/SauceDemoCommonFunctions";

test.describe("Inventory page testing", () => {

    let currentPage: Page;
    let sdTestData: SauceDemoTestData;
    let sdCommon: SauceDemoCommonFuctions;

    test.beforeEach(async ({ page, loginPage }) => {
        currentPage = page;
        sdCommon = new SauceDemoCommonFuctions(currentPage);
        sdTestData = new SauceDemoTestData();

        // Navigates to the URL
        await sdCommon.navigateTo(sdTestData.AppURLs.loginPage);

        //Login the user
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

    test("Dynamic Data Validation 1", async ({ inventoryPage }) => {
        for (const sort of sdTestData.sortingOptionsByTitle) {
            await test.step(`should sort items from ${sort.label}`, async () => {
                await inventoryPage.sortBy(sort.value);
                await inventoryPage.verifyTitleSort(sort.expected);
            });
        }
    })

    test("Dynamic Data Validation 2", async ({ inventoryPage }) => {
        for (const sort of sdTestData.sortingOptionsByPrice) {
            await test.step(`should sort items from ${sort.label}`, async () => {
                await inventoryPage.sortBy(sort.value);
                await inventoryPage.verifyPriceSort(sort.expected)
            });
        }
    })
})
