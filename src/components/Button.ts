import {BaseComponent} from "./BaseComponent";
import {test} from "@fixture";



export class Button extends BaseComponent {

    public async doubleClick(): Promise<void> {
        await test.step(`Double click on ${this.name} element with locator ${this.root}`, async () => {
            await this.root.dblclick()
        })
    }

    public async hover(): Promise<void> {
        await test.step(`Hover on ${this.name} element with locator ${this.root}`, async () => {
            await this.root.hover()
        })
    }


}