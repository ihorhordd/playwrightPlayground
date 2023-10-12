import {expect, test} from "@fixture";
import {Locator, Page} from "@playwright/test"
import {Selector} from "@ourTypes/components";

export class Base {

     protected readonly root: Locator

    constructor(
        protected readonly page: Page,
        element?: Selector,
    ) {
        this.root = this.locator(element!)
    }

    protected errorMessage(target: any = this.root, errorText: string): string {
        const error = `Error: ${target} ${errorText}`
        return error
    }

    // protected locatorToCssSelector(locator: Locator){
    //     const locatorStr = `${locator}`
    //     return locatorStr.slice(7, locatorStr.length-1)
    // }

    protected locator(selector: string | Locator, options?: { has?: Locator }): Locator {
        return typeof selector === 'string'
            ? this.page.locator(selector, options)
            : selector
    }

    public async click(target = this.root) {
        await test.step(`Click ${target}`, async () => {
            return target.click()
        })
    }

    protected async getInnerText(target = this.root) {
        const innerText = await target.innerText()
        return innerText
    }

    protected getByText(text: string, options?: { exact: boolean }) {
        return this.page.getByText(text, options);
    }

    protected async getAttribute(attributeName: string, target = this.root) {
        return await test.step(`Get attribute of element ${this.root}`, async () => {
            return target.getAttribute(attributeName)
        })
    }

     async shouldBeVisible(target = this.root): Promise<void> {
        await test.step(`Check if ${target} is visible`, async () => {
            await expect(target, {message: `${this.errorMessage(target, 'is not visible')}`}
            ).toBeVisible()
        })
    }

    public async shouldNotBeVisible(target = this.root): Promise<void> {
        await test.step(`Check if ${target} is not visible`, async () => {
            await expect(target, `${this.errorMessage(target, 'is present on the page')}`
            ).toHaveCount(0)
        })
    }


    public async shouldHaveAttr(attr: string, value: any, target = this.root) {
        await test.step(`Check if ${target} has attribute: ${attr} with value: ${value}`, async () => {
            await expect(target).toHaveAttribute(attr, attr)
        })
    }

}