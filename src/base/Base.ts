import {expect, test} from "@fixture";
import {Locator, Page} from "@playwright/test"
import {Selector} from "@ourTypes/components";

export class Base {

    protected readonly root: Locator

    constructor(
        protected readonly page: Page,
        element?: Selector,
        public name?: string,
    ) {
        this.root = this.locator(element!)
    }

    protected errorMessage(target: any = this.root, errorText: string): string {
        return `Error: ${target} ${errorText}`
    }

    protected locator(selector: string | Locator, options?: { has?: Locator }): Locator {
        return typeof selector === 'string'
            ? this.page.locator(selector, options)
            : selector
    }

    public async click(target = this.root) {
        await test.step(`Click "${this.name}" with ${target}`, async () => {
            return target.click()
        })
    }

    protected async getInnerText(target = this.root) {
        return await test.step(`Get inner text of "${this.name}" with ${target}`, async () => {
            return await target.innerText()
        })

    }

    protected async getByText(text: string, options?: { exact: boolean }): Promise<Awaited<Locator>> {
        return await test.step(`Get element with text: "${text}"`, async () => {
            return this.page.getByText(text, options)
        })
    }

    protected async getAttribute(attributeName: string, target = this.root) {
        return await test.step(`Get attribute of "${this.name}" with ${this.root}`, async () => {
            return target.getAttribute(attributeName)
        })
    }

    async shouldBeVisible(target = this.root): Promise<void> {
        await test.step(`Check if "${this.name}" with ${target} is visible`, async () => {
            await expect(target, {message: `${this.errorMessage(target, 'is not visible')}`}
            ).toBeVisible()
        })
    }

    protected async getParentElement(target: Selector) {
        return await test.step(`Get parent element of "${this.name}" with ${target}`, async () => {
            return this.locator(target).locator('..')
        })

    }

    public async shouldNotBeVisible(target = this.root): Promise<void> {
        await test.step(`Check if "${this.name}" with ${target} is not visible`, async () => {
            await expect(target, `${this.errorMessage(target, 'is present on the page')}`
            ).toHaveCount(0)
        })
    }


    public async shouldHaveAttr(attr: string, value: any, target = this.root) {
        await test.step(`Check if "${this.name}" with ${target} has attribute: ${attr} with value: ${value}`, async () => {
            await expect(target).toHaveAttribute(attr, attr)
        })
    }

    public getChildElement(target = this.root, path: string[]) {
        let elementToReturn = target
        for (const selector of path) {
            elementToReturn = elementToReturn.locator(selector)

        }
        return elementToReturn
    }

}