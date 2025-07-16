import { test } from '@playwright/test';
import { LoginPage } from '../POM/loginPage';
import { AppURLs, ErrorMessages, testConfig } from '../testConfig';

test.describe("Login Page Tests", () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  })

  test('Login User with Correct Username and Password', async () => {

    await loginPage.loginUser(testConfig.username, testConfig.password);
    await loginPage.verifyLogin();
  });

  test('Login User with Incorrect Username and correct password', async () => {
    
    await loginPage.loginUser("incorrect_username", testConfig.password);
    await loginPage.verifyLoginErrorMessage(ErrorMessages.invalidCredentials);
  });

  test('Login User with Incorrect Username and Incorrect password', async () => {
    
    await loginPage.loginUser("incorrect_username", "secret_sauce");
    await loginPage.verifyLoginErrorMessage(ErrorMessages.invalidCredentials);
  });

  test('Login User with Correct Username and Incorrect password', async () => {
    
    await loginPage.loginUser(testConfig.username, "incorrect_password");
    await loginPage.verifyLoginErrorMessage(ErrorMessages.invalidCredentials);
  });
  
  test('Login User with Empty Username and Empty password', async () => {
    
    await loginPage.loginUser("", "");
    await loginPage.verifyLoginErrorMessage(ErrorMessages.usernameRequired);
  });

  test('Login User with Empty Username and password', async () => {
    
    await loginPage.loginUser("", testConfig.password);
    await loginPage.verifyLoginErrorMessage(ErrorMessages.usernameRequired);
  });
  
  test('Login User with Username and Empty password', async () => {
    
    await loginPage.loginUser(testConfig.username, "");
    await loginPage.verifyLoginErrorMessage(ErrorMessages.passwordRequired);
  });

  test('Without login trying to access Inventory', async ({page}) => {
    
    await page.goto(AppURLs.inventory);
    await loginPage.restrictUserToAccessInventoryWithoutLogin();
  });

  test('Without login trying to access Cart', async ({page}) => {
    
    await page.goto(AppURLs.cart);
    await loginPage.restrictUserToAccessCartWithoutLogin();
  });
})