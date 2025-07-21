export class SauceDemoTestData {
    readonly validCreds = {
        username: `standard_user`,
        password: `secret_sauce`,
    }

    readonly invalidCreds = {
        username: 'invalid_user',
        password: 'wrong_pass',
    };


    readonly AppURLs = {
        loginPage: 'https://www.saucedemo.com/',
        inventory: 'https://www.saucedemo.com/inventory.html',
        cart: 'https://www.saucedemo.com/cart.html',
        aboutPage: 'https://saucelabs.com/',
    };


    readonly ErrorMessages = {
        invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
        usernameRequired: 'Epic sadface: Username is required',
        passwordRequired: 'Epic sadface: Password is required',
        restrictUserFromAccessingInventory: "Epic sadface: You can only access '/inventory.html' when you are logged in.",
        restrictUserFromAccessingCart: "Epic sadface: You can only access '/cart.html' when you are logged in.",
    };

    readonly SortType = {
        Az: 'az',
        Za: 'za',
        LowToHigh: 'lohi',
        HighToLow: 'hilo',
    } as const;

    readonly sortingOptionsByTitle = [
        { label: 'A to Z', value: this.SortType.Az, expected: "asc" },
        { label: 'Z to A', value: this.SortType.Za, expected: "desc" },
    ] as const;

    readonly sortingOptionsByPrice = [
        { label: 'Low to High', value: this.SortType.LowToHigh, expected: 'asc' },
        { label: 'High to Low', value: this.SortType.HighToLow, expected: 'desc' },
    ] as const;
    
}