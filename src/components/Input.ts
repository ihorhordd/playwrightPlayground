import {BaseComponent} from "./BaseComponent";
import {expect, test} from "@fixture";



export class Input extends BaseComponent {

    public async getInputValue(): Promise<string> {
        return test.step(`Get text from ${this.root}`, async () => {
            return await this.root.inputValue()
        })
    }

    public async clearInput() {
        await test.step(`Clear ${this.root}`, async () => {
            await this.root.clear()
        })
    }

    public async fill(text: string, validate?: boolean) {
        await test.step(`Fill ${this.name} with text: "${text}"`, async () => {
            await this.root.fill(text)
        })
        if (validate) {
            await this.shouldHaveValue(text)
        }
    }

    public async shouldHaveValue(value: any) {
        await test.step(`Check if "${this.name}" with ${this.root} have value: "${value}"`, async () => {
            await expect.soft(this.root,
                `${this.root} does not have ${value}`
            ).toHaveValue(value)
        })
    }

}