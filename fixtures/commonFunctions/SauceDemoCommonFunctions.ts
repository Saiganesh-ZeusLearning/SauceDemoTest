import { Page } from "@playwright/test";

export class SauceDemoCommonFuctions{

    private page: Page;

    constructor(page: Page){
        this.page = page;    
    }

    async navigateTo(url: string){
        await this.page.goto(url);
    }
    
}