import {BaseComponent} from "@components";
import {Page} from "@playwright/test";
import {Selector} from "@types";


export class TextElement extends BaseComponent {

    constructor(page: Page, name: string, selector: Selector) {
        super(page, name, selector);

    }

    public async getText(): Promise<string>{
        return await this.getInnerText(this.root)
    }

}