import {BaseComponent} from "@components/BaseComponent";
import {Page} from "@playwright/test";
import {Selector} from "componentTypes";


export class TextElement extends BaseComponent {

    constructor(page: Page, name: string, selector: Selector) {
        super(page, name, selector);

    }

    public async getText(): Promise<string>{
        return await this.getInnerText(this.root)
    }

}