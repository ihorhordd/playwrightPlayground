import {BaseComponent} from "./BaseComponent";
import {expect, test} from "@fixture";



export class Input extends BaseComponent {

    public async getInputValue(): Promise<string> {
        return test.step(`Get text from ${this.component}`, async () => {
            return await this.component.inputValue()
        })
    }

    public async clearInput() {
        await test.step(`Clear ${this.component}`, async () => {
            await this.component.clear()
        })
    }

    public async fill(text: string, validate?: boolean) {
        await test.step(`Fill ${this.name} with text: "${text}"`, async () => {
            await this.component.fill(text)
        })
        if (validate) {
            await this.shouldHaveValue(text)
        }
    }

    public async shouldHaveValue(value: any) {
        await test.step(`Check if "${this.name}" with ${this.component} have value: "${value}"`, async () => {
            await expect.soft(this.component,
                `${this.component} does not have ${value}`
            ).toHaveValue(value)
        })
    }

}