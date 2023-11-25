import {Locator, Page} from "@playwright/test";
import {Base} from "@base/Base";
import {Selector} from "@types";

export abstract class BaseComponent extends Base {
    protected root: Locator

    constructor(
        page: Page,
        public name: string,
        private readonly container: Selector,
        protected readonly selectorForRoot: Selector,
    ) {
        super(page, name, selectorForRoot)
        this.root = this.rootTypeHandler(this.container, this.selectorForRoot)
    }

    private rootTypeHandler(container: Selector, selectorForRoot: Selector) {
        const isSelectorForRootString = typeof selectorForRoot === 'string'
        const containerLocator = this.locator(container)
        const selectorForRootLocator = this.locator(container).locator(selectorForRoot)
        return isSelectorForRootString
            ? this.getChildElement(selectorForRoot, containerLocator)
            : selectorForRootLocator
    }

    public getLocator() {
        return this.root
    }

    protected override errorMessage(target: any = this.root, errorText: string): string {
        return `Component error: ${this.name} with ${target} ${errorText}`
    }

}