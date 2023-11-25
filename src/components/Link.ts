import {BaseComponent} from "./BaseComponent";
import {test} from "@fixture";

export class Link extends BaseComponent {

    public async getHref(){
        return await test.step(`Get href of ${this.root}`, async () => {
            return await this.getAttribute('href')
        })
    }

}