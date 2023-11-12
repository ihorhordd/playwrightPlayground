import {test} from "@fixture";
import {expect} from "@playwright/test";

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


test('CheckDashBoard', async ({dashboardPage}) => {
    await dashboardPage.goto()
    const generalInfo = await dashboardPage.getAllTestCaseStats()
    expect(generalInfo).toStrictEqual({noRun: 4, passed: 5, failed: 2, total: 11})
    await dashboardPage.refreshTestCasesDashboard()
})

test('TestCase Page', async ({testCaseDashboardPage}) => {
    await testCaseDashboardPage.goto()
    const myTestCase = await testCaseDashboardPage.getTestCaseById(6)
    const stats = await myTestCase.getTestCaseInfo()
    await myTestCase.shouldBeVisible()
    const testCaseToDelete = await testCaseDashboardPage.getTestCaseBySummary(
        'fail empty form registration check'
    )
    console.log(await testCaseToDelete.getTestCaseInfo())

})

test('Update test case', async ({testCaseDashboardPage}) => {
    await testCaseDashboardPage.goto()
    const myTestCase = await testCaseDashboardPage.getTestCaseById(1)
    const updatePage = await myTestCase.getUpdateTestCasePage()
    await updatePage.isOnPage()
    const baseDescription = await updatePage.testCaseUpdateForm.getDescription()
    await updatePage.testCaseUpdateForm.clearDescription()
    await updatePage.testCaseUpdateForm.fillDescription('New description 44$$$$$')
    const updatedDescription = await updatePage.testCaseUpdateForm.getDescription()
    console.log(baseDescription)
    expect(baseDescription).toBe('set \n' +
        'user like alice,\n' +
        'email like aaa@bbb.com,\n' +
        'password like Qamania123')
    expect(updatedDescription).toBe('New description 44$$$$$')
})