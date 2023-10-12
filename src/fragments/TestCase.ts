import {Button} from "@components/Button";
import {test} from "@fixture";
import {Page} from "@playwright/test";
import {Base} from "../base/Base";
import {TestCaseStatus} from "@ourTypes/Enum";
import {ITestCase} from "@fragmentTypes";

export class TestCase extends Base {

    private readonly row = this.locator(`tr.testRow_${this.id}`)

    private readonly idColumn = this.row.locator(`td:nth-child(1)`)

    private readonly summary = this.row.locator(`td:nth-child(2)`)

    private readonly authorColumn = this.row.locator('td.ttAuthor')

    private readonly descriptionColumn = this.row.locator('td.ttDes div')

    private readonly lastExecutor = this.row.locator('td.ttLast')

    private readonly passBtn =
        new Button(this.page, 'Mark as passed btn', this.row.locator('td button.ttPass'))

    private readonly failBtn =
        new Button(this.page, 'Mark as failed btn', this.row.locator('td button.ttFail'))

    private readonly editTestCaseBtn =
        new Button(this.page, 'Edit test case btn', this.row.locator('td.ttDetailsBtn button'))

    private readonly deleteTestCaseBtn =
        new Button(this.page, 'Edit test case btn', this.row.locator('td.ttRemBtn button'))

    private readonly runStatus = this.row.locator('td.ttStatus span')

    protected override root = this.row

    constructor(page: Page, private id: number) {
        super(page);
    }

    public async getSummaryText() {
        return await test.step(`Get summary of test case with id ${this.id}`, async () => {
            const summaryLocator = this.locator(this.summary)
            return await this.getInnerText(summaryLocator)
        })
    }

    public async markTestCase(status: TestCaseStatus.fail | TestCaseStatus.pass) {
        await test.step(`Mark test case with if ${this.id} as ${status}`, async () => {
            return status === TestCaseStatus.pass
                ? this.passBtn.click()
                : this.failBtn.click()
        })
    }

    public async getTestCaseRow() {
        return await test.step(`Return row with id ${this.id}`, async () => {
            return this.row
        })
    }

    public async deleteTestCase() {
        await test.step(`Delete test case with if ${this.id}`, async () => {
            await this.deleteTestCaseBtn.click()
        })
    }

    public async getStatus(): Promise<string> {
        return await test.step(`Delete test case with if ${this.id}`, async () => {
            const status = (await this.getInnerText(this.runStatus)).toLowerCase()
            return status
        })
    }

    public async getDescription() {
        return await test.step(`Get describtion of test case with id ${this.id}`, async () => {
            return await this.getInnerText(this.descriptionColumn)
        })
    }

    public async getAuthor(): Promise<string> {
        return await test.step(`Get Author of test case with id ${this.id}`, async () => {
            return this.getInnerText(this.authorColumn)
        })
    }

    public async getLastExecutor(): Promise<string> {
        return await test.step(`Get last executor of test case with id ${this.id}`, async () => {
            return this.getInnerText(this.lastExecutor)
        })
    }

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



}