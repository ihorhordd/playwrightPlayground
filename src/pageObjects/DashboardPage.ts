import {BasePage} from "@base/BasePage";
import {Page} from "@playwright/test";
import {expect, test} from "@fixture";
import {TestCaseDashboardRow} from "@types";
import {Button,TextElement} from "@components";
import {boxStep, stringifyObject} from "@helpers";

export class DashboardPage extends BasePage {

    public readonly dashboardBox = this.locator('div.wBox')

    private testCaseRowStatusRow = (testCaseStatus: TestCaseDashboardRow) => new TextElement(this.page, `Test Case ${testCaseStatus} status row`, `p.${testCaseStatus}`)
    private testCaseStatusCount = (testCaseStatus: TestCaseDashboardRow) => new TextElement(this.page, `Test Case ${testCaseStatus} status count`, this.testCaseRowStatusRow(testCaseStatus).getChildElement(['span']))
    public readonly refreshStatsButton = new Button(this.page, 'refresh stats button', 'div.refresh input[value="Refresh Stats"]')

    constructor(page: Page) {
        super(page, 'http://127.0.0.1:8000/');
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
        const statuses: TestCaseDashboardRow[] = ['failed', 'passed', 'noRun', 'total']
        let finalStats: Record<TestCaseDashboardRow, number | null> = {
            passed: null,
            failed: null,
            noRun: null,
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
            const requestPromise = this.page.waitForResponse('http://127.0.0.1:8000/getstat/');
            await this.refreshStatsButton.click()
            const responseStatus = (await requestPromise).status()
            const responseMethod = (await requestPromise).request().method()
            expect.soft(responseMethod).toBe('GET')
            expect.soft(responseStatus).toBe(200)
        })
    }

}