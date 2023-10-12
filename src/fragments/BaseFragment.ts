import {Page} from "@playwright/test";
import {Base} from "../base/Base";
import {Selector} from "@ourTypes/components";
import {test} from "@fixture";


export class BaseFragment extends Base{
    constructor(page: Page, private name: string, rootSelector: Selector) {
        super(page, rootSelector)
    }

    public async allElementsShouldBeVisible(){
        await test.step(`Every element of fragment ${this.name} shouldBeVisible`, async () => {

        })
    }
}