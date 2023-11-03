import {BaseComponent} from "./BaseComponent";
import {test} from "@fixture";
import {Page} from "@playwright/test";
import {Selector} from "@types";

export class Link extends BaseComponent {

    constructor(page: Page, name: string, selector: Selector) {
        super(page, name, selector);
    }

    public async getHref(){
        return await test.step(`Get href of ${this.component}`, async () => {
            return await this.getAttribute('href')
        })
    }

}