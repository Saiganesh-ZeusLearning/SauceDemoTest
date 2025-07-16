export const testConfig = {
    username: `standard_user`,
    password: `secret_sauce`,
}

export const AppURLs = {
  base: 'https://www.saucedemo.com/',
  inventory: 'https://www.saucedemo.com/inventory.html',
  cart: 'https://www.saucedemo.com/cart.html',
  aboutPage: 'https://saucelabs.com/',
};

export const ErrorMessages = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
};

export enum SortType {
  Az = 'az',
  Za = 'za',
  LowToHigh = 'lohi',
  HighToLow = 'hilo',
};