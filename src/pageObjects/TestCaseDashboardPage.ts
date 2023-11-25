import {BasePage} from "@base/BasePage";
import {Page} from "@playwright/test";
import {TestCase} from "@fragments";
import {test} from "@fixture";
import {Button, TextElement} from "@components";
import {boxStep} from '@helpers'


export class TestCaseDashboardPage extends BasePage {
    //TODO Investigate how to treat tables without locator approach
    private readonly testCaseTable = this.locator('table.testTable')
    private readonly testCaseRow = this.locator('tbody tr[class^=testRow]')
    private readonly idColumn = new TextElement(this.page, 'Id column', this.testCaseRow, 'td:nth-child(1)' )
    private readonly uploadTestsBtn = new Button(this.page, 'Upload test btn', this.root, 'a.fileUploadBtn')
    private readonly downloadTestsBtn = new Button(this.page, 'Upload test btn', this.root, 'div.fileDownload input')
    private readonly downloadMoreBtn = new Button(this.page, 'Load more btn', this.root, 'div.loadMore input')

    constructor(page: Page) {
        super(page, 'TC Dashboard page', 'http://127.0.0.1:8000/tests/', 'div.wBox2');
    }

    @boxStep
    public async getTestCaseById(id: number): Promise<TestCase> {
        return await test.step(`Get test case with id ${id}`, () => {
            return new TestCase(this.page, id)
        })
    }

    @boxStep
    public async getTestCaseByIndex(tcIndex: number = 0): Promise<TestCase> {
        const tcIds = await this.getAllIds()
        const testCaseId = tcIndex >= 0 ? tcIds[tcIndex] : tcIds[tcIds.length + tcIndex]
        return await test.step(`Get first test case with index ${tcIndex} which has id ${testCaseId}`, async () => {
            return new TestCase(this.page, testCaseId)
        })
    }

    @boxStep
    public async getTestCaseBySummary(summary: string) {
        return await test.step(`Get test case by summary: "${summary}"`, async () => {
            const summaryLocator = await this.getByText(summary)
            const testCaseRow = await this.getParentElement(summaryLocator)
            const testCaseId = +await this.getInnerText(
                testCaseRow.locator('td').first()
            )
            return new TestCase(this.page, testCaseId)
        }, {box: true})
    }

    @boxStep
    public async getTestCasesCount() {
        return await test.step('Get count of test cases in the table', async () => {
            return this.testCaseTable.locator('').count()
        })
    }

    @boxStep
    public async getAllIds() {
        return await test.step('Get all ids from the table', async () => {
            const ids: number[] = []
            const testCaseRow = await this.idColumn.getLocator().all()
            for (const id of testCaseRow) {
                const idCell = new TextElement(this.page, 'TC id cell', this.root, id)
                ids.push(+(await idCell.getText()))
            }
            return ids
        })
    }
}