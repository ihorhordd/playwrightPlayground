import {BasePage} from "./BasePage";
import {Page} from "@playwright/test";
import {expect, test} from "@fixture";
import {TestCaseDashboardRow} from "@ourTypes/fragments";
import {Button} from "@components/Button";
import {TextElement} from "@components/TextElement";

export class DashboardPage extends BasePage {

    public readonly dashboardBox = this.locator('div.wBox')

    private testCaseRowStatusRow = (testCaseStatus: TestCaseDashboardRow) => new TextElement(this.page, 'Test Case Status Row', `p.${testCaseStatus}`)
    private testCaseStatusCount = (testCaseStatus: TestCaseDashboardRow) => new TextElement(this.page, 'Test Case Status Count', `${this.testCaseRowStatusRow(testCaseStatus)} span`)
    public readonly refreshStatsButton = new Button(this.page, 'refresh stats button', 'div.refresh input[value="Refresh Stats"]')

    constructor(page: Page) {
        super(page, 'http://127.0.0.1:8000/');
    }

    public async getStatusRow(status: TestCaseDashboardRow) {
        const testCaseCount = this.testCaseStatusCount(status).getText()
        const row = this.testCaseRowStatusRow(status)
        return {
            row,
            testCaseCount
        }
    }

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
                finalStats[status] = +(await this.getStatusRow(status)).testCaseCount
            }
        })
        if (Object.values(finalStats).some(val => !val)) {
            this.errorMessage('getAllTestCaseStats',
                `Some key is falsy, check if stats were updated correctly:  ${finalStats}`)
        }
        return finalStats
    }

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