import {BaseComponent} from "./BaseComponent";
import {expect, test} from "@fixture";


export class Input extends BaseComponent {

    public async getInputValue(): Promise<string | undefined>{
     return  test.step(`Get text from ${this.component}`, async () => {
           return this.component.inputValue()
        })
    }

    public async clearInput(){
        await test.step(`Clear ${this.component}`, async () => {
            await this.component.clear()
        })
    }

    public async fill(text: string, validate?: boolean) {
        await test.step(`Fill ${this.component} with ${text}`, async () => {
            await this.component.fill(text)
        })
        if (validate){
            await this.shouldHaveValue(text)
        }
    }

    public async shouldHaveValue(value: any) {
        await test.step(`Check if ${this.component} have value: ${value}`, async () => {
            await expect.soft(this.component,
                `${this.component} does not have ${value}`
                ).toHaveValue(value)
        })
    }

}