import {BasePage} from "@base/BasePage";
import {Page} from "@playwright/test";
import {test} from "@fixture";
import {TestCaseDashboardRow} from "@types";
import {Button, TextElement} from "@components";
import {boxStep, stringifyObject} from "@helpers";

export class DashboardPage extends BasePage {

    public readonly dashboardBox = this.locator('div.wBox')
    private testCaseRowStatusRow = (testCaseStatus: TestCaseDashboardRow) => new TextElement(this.page, `Test Case ${testCaseStatus} status row`, this.root, `p.${testCaseStatus}`)
    private testCaseStatusCount = (testCaseStatus: TestCaseDashboardRow) => new TextElement(this.page, `Test Case ${testCaseStatus} status count`, this.testCaseRowStatusRow(testCaseStatus).getLocator(), 'span')
    public readonly refreshStatsButton = new Button(this.page, 'refresh stats button', this.root, this.locator('div.refresh input[value="Refresh Stats"]'))

    constructor(page: Page) {
        super(page, 'Dashboard Page', '/', 'div.wrap');
    }

    @boxStep
    public async getStatusRow(status: TestCaseDashboardRow) {
        const testCaseCount = +(await this.testCaseStatusCount(status).getText())
        const row = this.testCaseRowStatusRow(status)
        return {
            row,
            testCaseCount
        }
    }

    @boxStep
    public async getAllTestCaseStats(): Promise<Record<TestCaseDashboardRow, number | null>> {
        const statuses: TestCaseDashboardRow[] = ['failed', 'passed', 'norun', 'total']
        let finalStats: Record<TestCaseDashboardRow, number | null> = {
            passed: null,
            failed: null,
            norun: null,
            total: null
        }
        await test.step('Get current stats from dashboard', async () => {
            for (const status of statuses) {
                finalStats[status] = (await this.getStatusRow(status)).testCaseCount
            }
        })
        if (Object.values(finalStats).some(val => !val)) {
            console.log(this.errorMessage('getAllTestCaseStats',
                `Some key is falsy, check if stats were updated correctly: 
                ${stringifyObject(finalStats)}`))
        }
        return finalStats
    }

    @boxStep
    public async refreshTestCasesDashboard() {
        return await test.step('Refresh the TestCases Dashboard', async () => {
            await this.refreshStatsButton.click()
        })
    }

}