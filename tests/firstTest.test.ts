import {test, expect} from "@fixture";


test.describe('test suite', async () => {

    test.beforeEach(async ({loginPage}) => {
        await loginPage.goto()
        await test.step('Login as Alice', async () => {
            const userName = 'alice'
            const password = 'Qamania123'
            await test.step('Login', async () => {
                await loginPage.fillUserName(userName)
                await loginPage.userNameInput.shouldHaveValue(userName)
                await loginPage.passwordInput.shouldBeVisible()
                await loginPage.fillPassword(password)
            })
            await test.step('Click Login Button', async () => {
                await loginPage.clickLoginButton()
            })
        })

    })


    test('Mock dashboard', async ({dashboardPage, mockService}) => {
        await dashboardPage.goto()
        const payload = JSON.stringify({norun: 4, passed: 6, failed: 5, total: 15})
        await mockService.fulfillRequest('**/getstat/*').withPayload(payload)
        await dashboardPage.refreshTestCasesDashboard()
        const dashboardData = await dashboardPage.getAllTestCaseStats()
        expect(dashboardData).toEqual({norun: 4, passed: 6, failed: 5, total: 15})

    })


})
