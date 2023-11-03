import {BaseComponent} from "./BaseComponent";
import {test} from "@fixture";
import {Page} from "@playwright/test";
import {Selector} from "@types"


export class Button extends BaseComponent {

    constructor(page: Page, name: string, selector: Selector) {
        super(page, name, selector);
    }

    public async doubleClick(): Promise<void> {
        await test.step(`Double click on ${this.name} element with locator ${this.component}`, async () => {
            await this.component.dblclick()
        })
    }

    public async hover(): Promise<void> {
        await test.step(`Hover on ${this.name} element with locator ${this.component}`, async () => {
            await this.component.hover()
        })
    }


}