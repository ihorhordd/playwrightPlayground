import {expect, test} from "@fixture";


test.beforeEach(async ({loginPage}) => {
    await loginPage.goto()
    await test.step('Login as Alice', async () => {
        const userName = 'alice'
        const password = 'Qamania123'
        await test.step('Login', async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
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


test('CheckDashBoard', async ({dashboardPage}) => {
    await dashboardPage.goto()
    const generalInfo = await dashboardPage.getAllTestCaseStats()
    expect(generalInfo).toStrictEqual({noRun: 4, passed: 6, failed: 2, total: 12})
    await dashboardPage.refreshTestCasesDashboard()
})

test('TestCase Page', async ({testCaseDashboardPage}) => {
    await testCaseDashboardPage.goto()
    const myTestCase = await testCaseDashboardPage.getTestCaseById(6)
    const stats = await myTestCase.getTestCaseInfo()
    console.log(stats)
    await myTestCase.shouldBeVisible()
    // const testCaseToDelete = await testCaseDashboardPage.getTestCaseById(15)
    // console.log(await testCaseToDelete.getTestCaseInfo())
    // await testCaseToDelete.deleteTestCase()
    // await testCaseToDelete.shouldNotBeVisible()
})

