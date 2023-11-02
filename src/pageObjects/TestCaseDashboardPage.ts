import {BasePage} from "../base/BasePage";
import {Page} from "@playwright/test";
import {TestCase} from "@fragments/TestCase";
import {test} from "@fixture";
import {Button} from "@components/Button";


export class TestCaseDashboardPage extends BasePage {
    //TODO Investigate how to treat tables without locator approach
    private readonly testCaseTable = this.locator('table.testTable')
    private readonly testCaseRow = this.locator('tbody tr[class^=testRow]')
    private readonly idColumn = this.getChildElement(['td:nth-child(1)'], this.testCaseRow)
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
            const summaryLocator = await this.getByText(summary, {exact: true})
            const testCaseRow = await this.getParentElement(summaryLocator)
            const testCaseId = +await this.getInnerText(
                testCaseRow.locator('td').first()
            )
            return new TestCase(this.page, testCaseId)
        },{box: true})
    }

    public async getTestCasesCount() {
        return await test.step('Get count of test cases in the table', async () => {
            return this.testCaseTable.locator('').count()
        })
    }

    public async getAllIds() {
        return await test.step('Get all ids from the table', async () => {
            const ids: number[] = []
            const testCaseRow = await this.idColumn.all()
            for (const id of testCaseRow) {
                ids.push(+(await this.getInnerText(id)))
            }
            return ids
        })
    }
}