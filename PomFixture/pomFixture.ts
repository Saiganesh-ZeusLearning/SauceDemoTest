import { test as base } from "@playwright/test";
import { LoginPage } from "../POM/loginPage";
import { InventoryPage } from "../POM/InventoryPage";

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