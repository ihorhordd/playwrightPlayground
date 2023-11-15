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
    const descriptionText = 'New description 44$$$$$'
    await testCaseDashboardPage.goto()
    const myTestCase = await testCaseDashboardPage.getTestCaseById(1)
    const updatePage = await myTestCase.getUpdateTestCasePage()
    await updatePage.testCaseUpdateForm.clearDescription()
    await updatePage.testCaseUpdateForm.fillDescription(descriptionText)
    const updatedDescriptionVal = await updatePage.testCaseUpdateForm.getDescription()
    expect(updatedDescriptionVal).toBe(descriptionText)
})