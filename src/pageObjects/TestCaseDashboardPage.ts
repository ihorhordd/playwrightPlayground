import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {TestCase} from "@fragments/TestCase";
import {test} from "@fixture";
import {Button} from "@components/Button";


export class TestCaseDashboardPage extends BasePage {
    private readonly testCaseTable = this.locator('table.testTable')
    private readonly uploadTestsBtn = new Button(this.page, 'Upload test btn', 'a.fileUploadBtn')
    private readonly downloadTestsBtn = new Button(this.page, 'Upload test btn', 'div.fileDownload input')
    private readonly downloadMoreBtn = new Button(this.page, 'Load more btn', 'div.loadMore input')

    constructor(page: Page) {
        super(page, 'http://127.0.0.1:8000/tests/');
    }

    public async getTestCaseById(id: number): Promise<TestCase> {
        return await test.step(`Get test case with id ${id}`, () => {
            return new TestCase(this.page, id)
        })
    }

    public async getTestCaseBySummary(summary: string) {
        return await test.step(`Get test case by summary: ${summary}`, async () => {
            const summaryLocator = this.getByText(summary, {exact: true})
            const testCaseRow = summaryLocator.locator('..')
            const testCaseId = +await this.getInnerText(
                testCaseRow.locator('td').first()
            )
            return new TestCase(this.page, testCaseId)
        })
    }


}