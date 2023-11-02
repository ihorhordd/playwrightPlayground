import {Page} from "@playwright/test";
import {Base} from "./Base";
import {Selector} from "componentTypes";
import {test} from "@fixture";


export class BaseFragment extends Base {
    constructor(page: Page,  rootSelector: Selector) {
        super(page, rootSelector)
    }

}