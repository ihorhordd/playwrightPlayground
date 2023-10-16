import {test as base, expect as baseExpect} from '@playwright/test'
import {LoginPage} from "@pages/LoginPage";
import {DashboardPage} from "@pages/DashboardPage";
import {TestCaseDashboardPage} from "@pages/TestCaseDashboardPage";


type fixtureType = {
    loginPage: LoginPage,
    dashboardPage: DashboardPage
    testCaseDashboardPage: TestCaseDashboardPage
}
export const test = base.extend<fixtureType>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    dashboardPage: async ({page}, use) => {
        const dashboardPage = new DashboardPage(page)
       await use(dashboardPage)
    },
    testCaseDashboardPage: async ({page}, use) => {
        const testCasePage = new TestCaseDashboardPage(page)
        await use(testCasePage)
    },
})

export const expect = baseExpect