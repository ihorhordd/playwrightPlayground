import {BasePage} from "@base/BasePage";
import {Page} from "@playwright/test";
import {UpdateTestCaseForm} from "@fragments";


export class UpdateTestCasePage extends BasePage {
    public testCaseUpdate = new UpdateTestCaseForm(this.page)

    constructor(page: Page, testCaseId: number) {
        super(page, `http://127.0.0.1:8000/tests/${testCaseId}`);
    }


}