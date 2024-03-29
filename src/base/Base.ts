import {expect, test} from "@fixture";
import {Locator, Page} from "@playwright/test"
import {Selector} from "@types";
import {boxStep, splitCssSelector} from "@helpers";

export abstract class Base {
    // TODO TBD  if leave boxStep decorator for Base methods


   protected constructor(
        protected readonly page: Page,
        public name?: string,
        protected selectorForRoot?: Selector,
    ) {}
    protected readonly root: Locator  = this.locator(this.selectorForRoot!)

    private logMessage(action: string, target: Selector){
        // TODO add this to methods
        return this.name
            ? `${action} of ${this.name} with ${target}`
            : `${action} of ${target}`
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

    @boxStep
    protected async getInnerText(target = this.root) {
        const message = this.name
            ? `Get inner text of ${this.name} with ${target}`
            : `Get inner text of ${target}`
        return await test.step(message, async () => {
            return await target.innerText()
        })

    }
    @boxStep
    protected async getByText(text: string, options?: { exact: boolean }): Promise<Awaited<Locator>> {
        return await test.step(`Get element with text: "${text}"`, async () => {
            return this.page.getByText(text, options)
        })
    }
    @boxStep
    protected async getAttribute(attributeName: string, target = this.root) {
        return await test.step(`Get attribute of "${this.name}" with ${this.root}`, async () => {
            return target.getAttribute(attributeName)
        })
    }
    @boxStep
    async shouldBeVisible(target = this.root): Promise<void> {
        await test.step(`Check if "${this.name}" with ${target} is visible`, async () => {
            await expect(target, {message: `${this.errorMessage(target, 'is not visible')}`}
            ).toBeVisible()
        })
    }
    @boxStep
    protected async getParentElement(target: Selector) {
            return this.locator(target).locator('..')
    }
    @boxStep
    public async shouldNotExist(target = this.root): Promise<void> {
        await test.step(`Check if "${this.name}" with ${target} is not visible`, async () => {
            await expect(target, `${this.errorMessage(target, 'is present on the page')}`
            ).toHaveCount(0)
        })
    }

    @boxStep
    public async shouldHaveAttr(attr: string, value: any, target = this.root) {
        await test.step(`Check if "${this.name}" with ${target} has attribute: ${attr} with value: ${value}`, async () => {
            await expect(target).toHaveAttribute(attr, attr)
        })
    }
    public getChildElement(pathToElement: string, target = this.root) {
        let elementToReturn = target
        const pathArr = splitCssSelector(pathToElement)
        for (const selector of pathArr) {
            elementToReturn = elementToReturn.locator(selector)
        }
        return elementToReturn
    }


}