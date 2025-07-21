import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/SauceDemo/login.page";
import { InventoryPage } from "./pages/SauceDemo/inventory.page";

type testPagesType = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}

const testPages = base.extend<testPagesType>(
    {
        loginPage: async ({page}, use) => {
            await use(new LoginPage(page)); 
        },
        inventoryPage: async ({page}, use) => {
            await use(new InventoryPage(page));
        },
    }
)

export const test = testPages;