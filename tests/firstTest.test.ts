import {test, expect, uiLoggedUserTest} from "@fixture";


test.describe('test suite', async () => {


    uiLoggedUserTest('Mock dashboard', async ({app: {dashboardPage}, mockService}) => {
        await dashboardPage.goto()
        const payload = JSON.stringify({norun: 4, passed: 6, failed: 5, total: 155})
        mockService.replaceResponse('**/getstat/*', {body: payload})
        await dashboardPage.refreshTestCasesDashboard()
        const dashboardData = await dashboardPage.getAllTestCaseStats()
        expect(dashboardData).toEqual({norun: 4, passed: 6, failed: 5, total: 155})

    })


})
