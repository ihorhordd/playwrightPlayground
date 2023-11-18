import {expect, test} from "@fixture";
import {Page} from "@playwright/test";
import {Base} from "@base/Base";
import {TestCaseStatus, ITestCase} from "@types";
import {TextElement, Button} from "@components";
import {UpdateTestCasePage} from "@pages";
import {boxStep} from "@helpers";

export class TestCase extends Base {
    // TODO: consider adding getChildElement by default
    private readonly row = new TextElement(this.page, `test case row ${this.id}`, this.root)
    private readonly rowLocator = this.row.getLocator()
    private readonly idColumn = new TextElement(this.page, 'Id Column', this.rowLocator.locator(`td:nth-child(1)`))
    public  readonly summary = new TextElement(this.page, 'TC Summary', this.rowLocator.locator(`td:nth-child(2)`))
    private readonly authorColumn = new TextElement(this.page, 'Author column', this.rowLocator.locator('td.ttAuthor'))
    private readonly descriptionColumn = new TextElement(this.page, 'Description Column', this.rowLocator.locator('td.ttDes div'))
    private readonly lastExecutor = new TextElement(this.page, 'Last Executor Cell', this.rowLocator.locator('td.ttLast'))
    private readonly passBtn = new Button(this.page, 'Mark as passed btn', this.rowLocator.locator('td button.ttPass'))
    private readonly failBtn = new Button(this.page, 'Mark as failed btn', this.rowLocator.locator('td button.ttFail'))
    private readonly updateTestCaseBtn = new Button(this.page, 'Update test case btn', this.rowLocator.locator('td.ttDetailsBtn button'))
    private readonly deleteTestCaseBtn = new Button(this.page, 'Delete test case btn', this.rowLocator.locator('td.ttRemBtn button'))
    private readonly runStatus = this.rowLocator.locator('td.ttStatus span')


    constructor(page: Page, private id: number) {
        super(page, `tr.testRow_${id}`, `Test Case with id ${id}`);
    }
    @boxStep
    public async getSummaryText() {
        return await test.step(`Get summary of test case with id ${this.id}`, async () => {
            const summaryLocator = this.locator(this.summary.getLocator())
            return await this.getInnerText(summaryLocator)
        })
    }

    @boxStep
    public async markTestCase(status: TestCaseStatus.Fail | TestCaseStatus.Pass) {
        await test.step(`Mark test case with if ${this.id} as ${status}`, async () => {
            return status === TestCaseStatus.Pass
                ? this.passBtn.click()
                : this.failBtn.click()
        })
    }
    @boxStep
    public async getTestCaseRow() {
        return await test.step(`Return row with id ${this.id}`, async () => {
            return this.row.getLocator()
        })
    }
    @boxStep
    public async deleteTestCase() {
        await test.step(`Delete test case with if ${this.id}`, async () => {
            await this.deleteTestCaseBtn.click()
        })
    }
    @boxStep
    public async getStatus(): Promise<string> {
        return await test.step(`Delete test case with if ${this.id}`, async () => {
            return (await this.getInnerText(this.runStatus)).toLowerCase()
        })
    }
    @boxStep
    public async getDescription() {
        return await test.step(`Get description of test case with id ${this.id}`, async () => {
            return await this.getInnerText(this.descriptionColumn.getLocator())
        })
    }
    @boxStep
    public async getAuthor(): Promise<string> {
        return await test.step(`Get Author of test case with id ${this.id}`, async () => {
            return this.getInnerText(this.authorColumn.getLocator())
        })
    }
    @boxStep
    public async getLastExecutor(): Promise<string> {
        return await test.step(`Get last executor of test case with id ${this.id}`, async () => {
            return this.getInnerText(this.lastExecutor.getLocator())
        })
    }
    @boxStep
    public async getTestCaseInfo(): Promise<ITestCase> {
        return await test.step(`Get test case with id ${this.id}`, async () => {
            const testCase: ITestCase = {
                id: this.id,
                summary: await this.getSummaryText(),
                description: await this.getDescription(),
                author: await this.getAuthor(),
                status: await this.getStatus(),
                lastExecutor: await this.getLastExecutor()
            }
            return testCase
        })
    }
    @boxStep
    public async getUpdateTestCasePage() {
        return await test.step(`Click "Update test case" btn`, async () => {
            await this.updateTestCaseBtn.click()
            return new UpdateTestCasePage(this.page, this.id)
        })
    }

    @boxStep
    public async shouldHaveStatus(expectedStatus: TestCaseStatus){
        const tcStatus = await this.getStatus()
        expect(tcStatus).toEqual(expectedStatus)
    }

    @boxStep
    public async shouldHaveDescription(expectedDescription: string){
        const tcStatus = await this.getDescription()
        expect(tcStatus).toEqual(expectedDescription)
    }

}