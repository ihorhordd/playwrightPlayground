import {expect, test} from "@fixture";
import {Page} from "@playwright/test";
import {Base} from "@base/Base";
import {Selector} from "@types";

export abstract class BasePage extends Base {
    protected constructor(
        page: Page,
        public name: string,
        private readonly url: string,
        protected selectorForRoot: Selector
    ) {
        super(page, name, selectorForRoot);
    }

    public async goto(url = this.url) {
        await test.step(`Visit url: ${url}`, async () => {
            return await this.page.goto(url)
        })
    }

    public async isOnPage(url: string = this.url) {
        await test.step('Verify current url', async () => {
            await expect(this.page).toHaveURL(url)
        })
    }

    public async isDisplayed(){
        await test.step(`Check if page ${this.name} is displayed`, async () => {
            await this.shouldBeVisible(this.root)
        })
    }

    public async pause(){
        await this.page.pause()
    }

}