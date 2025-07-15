import { test } from '@playwright/test';
import { LoginPage } from '../POM/loginPage';

test.describe("Login Page Tests", () => {

  test('Login User with Correct Username and Password', async ({ page, context }) => {

    const loginPage = new LoginPage(page, context);
    await loginPage.goto();

    await loginPage.loginUser("standard_user", "secret_sauce");
    await loginPage.verifyLogin();
  });

  test('Login User with Incorrect Username and correct password', async ({ page, context }) => {
    
    const loginPage = new LoginPage(page, context);
    loginPage.goto();
    
    await loginPage.loginUser("incorrect_username", "secret_sauce");
    await loginPage.verifyLoginWithIncorrectCredentials();
  });

  test('Login User with Incorrect Username and Incorrect password', async ({ page, context }) => {
    
    const loginPage = new LoginPage(page, context);
    loginPage.goto();
    
    await loginPage.loginUser("incorrect_username", "secret_sauce");
    await loginPage.verifyLoginWithIncorrectCredentials();
  });

  test('Login User with Correct Username and Incorrect password', async ({ page, context }) => {
    
    const loginPage = new LoginPage(page, context);
    loginPage.goto();
    
    await loginPage.loginUser("standard_user", "incorrect_password");
    await loginPage.verifyLoginWithIncorrectCredentials();
  });
  
  test('Login User with Empty Username and Empty password', async ({ page, context }) => {
    
    const loginPage = new LoginPage(page, context);
    loginPage.goto();
    
    await loginPage.loginUser("", "");
    await loginPage.verifyLoginWithEmptyUsername();
  });

  test('Login User with Empty Username and password', async ({ page, context }) => {
    
    const loginPage = new LoginPage(page, context);
    loginPage.goto();
    
    await loginPage.loginUser("", "secret_sauce");
    await loginPage.verifyLoginWithEmptyUsername();
  });
  
  test('Login User with Username and Empty password', async ({ page, context }) => {
    
    const loginPage = new LoginPage(page, context);
    loginPage.goto();
    
    await loginPage.loginUser("standard_user", "");
    await loginPage.verifyLoginWithEmptyPassword();
  });
})