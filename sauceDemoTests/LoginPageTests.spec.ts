import { Page } from '@playwright/test';
import { SauceDemoTestData } from '../fixtures/testdata/sauceDemo.testData';
import { test } from '../fixtures/pomFixture';
import { SauceDemoCommonFuctions } from '../fixtures/commonFunctions/SauceDemoCommonFunctions';

test.describe("Login Page Tests", () => {

  let currentPage: Page;
  let sdTestData: SauceDemoTestData;
  let sdCommon: SauceDemoCommonFuctions;

  test.beforeEach(async ({ page }) => {
    currentPage = page;
    sdCommon = new SauceDemoCommonFuctions(currentPage);
    sdTestData = new SauceDemoTestData();

    // Navigates to the URL
    await sdCommon.navigateTo(sdTestData.AppURLs.loginPage);
  })

  test('Sauce Demo Test Suite 1', async ({ loginPage }) => {
    await test.step('Login User with Correct Username and Password', async () => {
      await loginPage.loginUser(sdTestData.validCreds.username, sdTestData.validCreds.password);
      await loginPage.verifyLogin();
    });
  })

  test('Sauce Demo Test Suite 2', async ({ loginPage }) => {
    await test.step('Login User with Incorrect Username and correct password', async () => {

      await loginPage.loginUser(sdTestData.invalidCreds.username, sdTestData.validCreds.password);
      await loginPage.verifyLoginErrorMessage(sdTestData.ErrorMessages.invalidCredentials);
    });
  })

  test('Sauce Demo Test Suite 3', async ({ loginPage }) => {
    await test.step('Login User with Incorrect Username and Incorrect password', async () => {

      await loginPage.loginUser(sdTestData.invalidCreds.username, sdTestData.invalidCreds.password);
      await loginPage.verifyLoginErrorMessage(sdTestData.ErrorMessages.invalidCredentials);
    });
  })

  test('Sauce Demo Test Suite 4', async ({ loginPage }) => {
    await test.step('Login User with Correct Username and Incorrect password', async () => {

      await loginPage.loginUser(sdTestData.validCreds.username, sdTestData.invalidCreds.password);
      await loginPage.verifyLoginErrorMessage(sdTestData.ErrorMessages.invalidCredentials);
    });
  })

  test('Sauce Demo Test Suite 5', async ({ loginPage }) => {
    await test.step('Login User with Empty Username and Empty password', async () => {

      await loginPage.loginUser("", "");
      await loginPage.verifyLoginErrorMessage(sdTestData.ErrorMessages.usernameRequired);
    });
  })

  test('Sauce Demo Test Suite 6', async ({ loginPage }) => {
    await test.step('Login User with Empty Username and password', async () => {

      await loginPage.loginUser("", sdTestData.validCreds.password);
      await loginPage.verifyLoginErrorMessage(sdTestData.ErrorMessages.usernameRequired);
    });
  })

  test('Sauce Demo Test Suite 7', async ({ loginPage }) => {
    await test.step('Login User with Empty Username and password', async () => {

      await loginPage.loginUser("", sdTestData.validCreds.password);
      await loginPage.verifyLoginErrorMessage(sdTestData.ErrorMessages.usernameRequired);
    });
  })

  test('Sauce Demo Test Suite 8', async ({ loginPage }) => {
    await test.step('Login User with Username and Empty password', async () => {

      await loginPage.loginUser(sdTestData.validCreds.username, "");
      await loginPage.verifyLoginErrorMessage(sdTestData.ErrorMessages.passwordRequired);
    });
  })

  test('Sauce Demo Test Suite 9', async ({ loginPage }) => {
    await test.step('Without login trying to access Inventory', async () => {

      await sdCommon.navigateTo(sdTestData.AppURLs.inventory);
      await loginPage.restrictUserToAccessInventoryWithoutLogin();
    });
  })

  test('Sauce Demo Test Suite 10', async ({ loginPage }) => {
    await test.step('Without login trying to access Cart', async () => {

      await sdCommon.navigateTo(sdTestData.AppURLs.cart);
      await loginPage.restrictUserToAccessCartWithoutLogin();
    });
  })

})