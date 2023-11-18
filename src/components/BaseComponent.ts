import {Locator, Page} from "@playwright/test";
import {Base} from "@base/Base";
import {Selector} from "@types";

export class BaseComponent extends Base {

    constructor(
        page: Page,
        public name: string,
        private readonly selectorForRoot:  Selector,
    ) {
        super(page, selectorForRoot)
    }


    protected component: Locator = this.locator(this.selectorForRoot)

    public getLocator() {
        return this.component
    }

    protected override errorMessage(target: any = this.root, errorText: string): string {
        return `Component error: ${this.name} with ${target} ${errorText}`
    }

}