import {Locator, Page} from "@playwright/test";
import {Base} from "../base/Base";

export class BaseComponent extends Base {

    constructor(
        page: Page,
        public name: string,
        private readonly selector: string | Locator,
    ) {
        super(page, selector)
    }


    protected component: Locator = this.locator(this.selector)

    public getLocator() {
        return this.component
    }

    protected override errorMessage(target: any = this.root, errorText: string): string {
        return `Component error: ${this.name} with ${target} ${errorText}`
    }

}