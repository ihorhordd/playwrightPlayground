import {Locator, Page} from "@playwright/test";
import {Base} from "../base/Base";

export abstract class BaseComponent extends Base {

    constructor(
        page: Page,
        public name: string,
        private readonly selector: string | Locator,
    ) {
        super(page, selector)
    }


    protected component: Locator = this.locator(this.selector)


}