import {test as base, expect as baseExpect} from '@playwright/test'
import {LoginPage, DashboardPage, TestCaseDashboardPage} from "@pages";
import {MockService} from "../services/mockService";


type fixtureType = {
    // TODO: Decide if *app.* approach is better
    loginPage: LoginPage,
    dashboardPage: DashboardPage
    testCaseDashboardPage: TestCaseDashboardPage
    mockService: MockService
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
    mockService: async ({page}, use) => {
        const mockingService = new MockService(page)
        await use(mockingService)
    },
})

export const expect = baseExpect