import { test } from '../PomFixture/pomFixture';
import { AppURLs, ErrorMessages, testConfig } from '../testConfig';

test.describe("Login Page Tests", () => {

  test('Login User with Correct Username and Password', async ({loginPage}) => {

    await loginPage.goto();
    await loginPage.loginUser(testConfig.username, testConfig.password);
    await loginPage.verifyLogin();
  });
  
  test('Login User with Incorrect Username and correct password', async ({loginPage}) => {
    
    await loginPage.goto();
    await loginPage.loginUser("incorrect_username", testConfig.password);
    await loginPage.verifyLoginErrorMessage(ErrorMessages.invalidCredentials);
  });
  
  test('Login User with Incorrect Username and Incorrect password', async ({loginPage}) => {
    
    await loginPage.goto();
    await loginPage.loginUser("incorrect_username", "secret_sauce");
    await loginPage.verifyLoginErrorMessage(ErrorMessages.invalidCredentials);
  });
  
  test('Login User with Correct Username and Incorrect password', async ({loginPage}) => {
    
    await loginPage.goto();
    await loginPage.loginUser(testConfig.username, "incorrect_password");
    await loginPage.verifyLoginErrorMessage(ErrorMessages.invalidCredentials);
  });
  
  test('Login User with Empty Username and Empty password', async ({loginPage}) => {
    
    await loginPage.goto();
    await loginPage.loginUser("", "");
    await loginPage.verifyLoginErrorMessage(ErrorMessages.usernameRequired);
  });
  
  test('Login User with Empty Username and password', async ({loginPage}) => {
    
    await loginPage.goto();
    await loginPage.loginUser("", testConfig.password);
    await loginPage.verifyLoginErrorMessage(ErrorMessages.usernameRequired);
  });
  
  test('Login User with Username and Empty password', async ({loginPage}) => {
    
    await loginPage.goto();
    await loginPage.loginUser(testConfig.username, "");
    await loginPage.verifyLoginErrorMessage(ErrorMessages.passwordRequired);
  });
  
  test('Without login trying to access Inventory', async ({loginPage, page}) => {
    
    await loginPage.goto(AppURLs.inventory);
    await loginPage.restrictUserToAccessInventoryWithoutLogin();
  });

  test('Without login trying to access Cart', async ({loginPage, page}) => {
    
    await loginPage.goto(AppURLs.cart);
    await loginPage.restrictUserToAccessCartWithoutLogin();
  });
})