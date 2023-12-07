import {expect, test, testCaseDashboardTest} from "@fixture";
import {TestCase} from "@fragments";
import {TestCaseStatus} from "@types";

test.describe('TC dashboard', () => {

    testCaseDashboardTest('Verify that all test cases should have summary', async ({app: {tcDashboardPage}, page}) => {
        const ids = await tcDashboardPage.getAllIds()
        await test.step('Get summaries', async () => {
            for (const id of ids) {
                await test.step('Get test case and verify summary', async () => {
                    const testCase = new TestCase(page, id)
                    const summary = await testCase.getSummaryText()
                    await testCase.summary.shouldBeVisible()
                    expect(summary).toBeTruthy()
                }, {box: true})
            }
        }, {box: true})


    })

    testCaseDashboardTest.skip('Verify that test case could be marked as passed and failed', async ({app: {tcDashboardPage}}) => {
        // TODO Enable test after mocking is added
        const failedTestCase = await tcDashboardPage.getTestCaseBySummary('newTc')
        await failedTestCase.shouldBeVisible()
        await failedTestCase.shouldHaveStatus(TestCaseStatus.NoRun)

        await failedTestCase.markTestCase(TestCaseStatus.Fail)
        await failedTestCase.shouldHaveStatus(TestCaseStatus.Fail)

        await failedTestCase.markTestCase(TestCaseStatus.Pass)
        await failedTestCase.shouldHaveStatus(TestCaseStatus.Pass)


    })

    testCaseDashboardTest('Update test case', async ({app: {tcDashboardPage}}) => {
        const descriptionText = 'New description 44$$$$$'
        const myTestCase = await tcDashboardPage.getTestCaseById(1)
        const updatePage = await myTestCase.getUpdateTestCasePage()
        await updatePage.testCaseUpdateForm.clearDescription()
        await updatePage.testCaseUpdateForm.fillDescription(descriptionText)
        const updatedDescriptionVal = await updatePage.testCaseUpdateForm.getDescription()
        await updatePage.testCaseUpdateForm.clickUpdateButton()

        await tcDashboardPage.goto()
        await myTestCase.shouldHaveDescription(descriptionText)
        expect(updatedDescriptionVal).toBe(descriptionText)
    })

    testCaseDashboardTest.skip('Delete test case', async ({app: {tcDashboardPage}}) => {
        const testCaseToDelete = await tcDashboardPage.getTestCaseByIndex(-1)
        await testCaseToDelete.shouldBeVisible()
        await testCaseToDelete.deleteTestCase()
        await testCaseToDelete.shouldNotExist()
    })
})