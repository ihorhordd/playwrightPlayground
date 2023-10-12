import {test} from "@fixture";
import {Page} from "@playwright/test";
import {Base} from "../base/Base";

export class BasePage extends Base {
    protected constructor(
        page: Page,
        private readonly url: string
    ) {
        super(page);
    }

    public async goto(url = this.url) {
        await test.step(`Visit url: ${url}`, async () => {
            return await this.page.goto(url)
        })
    }


}