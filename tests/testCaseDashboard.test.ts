import {expect, test} from "@fixture";
import {users} from '@testData'
import {TestCase} from "@fragments";
import {TestCaseStatus} from "@types";

test.describe('TC dashboard', () => {


    test.beforeEach('Go to the TC dashboard page', async ({loginPage, testCaseDashboardPage}) => {
        await loginPage.goto()
        await loginPage.login(users.alice)
        await testCaseDashboardPage.goto()
    })


    test('Verify that all test cases should have summary', async ({testCaseDashboardPage, page}) => {
        const ids = await testCaseDashboardPage.getAllIds()
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

    test.skip('Verify that test case could be marked as passed and failed', async ({testCaseDashboardPage}) => {
        // TODO Enable test after mocking is added
        const failedTestCase = await testCaseDashboardPage.getTestCaseBySummary('newTc')
        await failedTestCase.shouldBeVisible()
        await failedTestCase.shouldHaveStatus(TestCaseStatus.NoRun)

        await failedTestCase.markTestCase(TestCaseStatus.Fail)
        await failedTestCase.shouldHaveStatus(TestCaseStatus.Fail)

        await failedTestCase.markTestCase(TestCaseStatus.Pass)
        await failedTestCase.shouldHaveStatus(TestCaseStatus.Pass)


    })

    test('Update test case', async ({testCaseDashboardPage}) => {
        const descriptionText = 'New description 44$$$$$'
        const myTestCase = await testCaseDashboardPage.getTestCaseById(1)
        const updatePage = await myTestCase.getUpdateTestCasePage()
        await updatePage.testCaseUpdateForm.clearDescription()
        await updatePage.testCaseUpdateForm.fillDescription(descriptionText)
        const updatedDescriptionVal = await updatePage.testCaseUpdateForm.getDescription()
        expect(updatedDescriptionVal).toBe(descriptionText)

        await updatePage.testCaseUpdateForm.clickUpdateButton()
        await testCaseDashboardPage.goto()
        await myTestCase.shouldHaveDescription(descriptionText)
    })

    test.skip('Delete test case', async ({testCaseDashboardPage}) => {
        const testCaseToDelete = await testCaseDashboardPage.getTestCaseByIndex(-1)
        await testCaseToDelete.shouldBeVisible()
        await testCaseToDelete.deleteTestCase()
        await testCaseToDelete.shouldNotBeVisible()
    })
})