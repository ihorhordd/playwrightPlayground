import {test as base, expect as baseExpect} from '@playwright/test'
import {LoginPage, DashboardPage, TestCaseDashboardPage} from "@pages";
import {MockService} from "../services/mockService";
import {Application} from "@base/App";


type fixtureType = {
    // TODO: Decide if *app.* approach is better
    loginPage: LoginPage,
    dashboardPage: DashboardPage
    testCaseDashboardPage: TestCaseDashboardPage
    mockService: MockService
}
export const baseFixture = base.extend<{ app: Application, mockService: MockService }>({
    app: async ({page}, use) => {
        const app = new Application(page);
        await use(app);
    },
    mockService: async ({page}, use) => {
        // TODO Add to ApiServices when implementeds
        await use(new MockService(page))
    }
});
export const test = base.extend<fixtureType>({
    // TODO Consider removing this
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


export const uiLoggedUserTest = baseFixture.extend<{ defaultUser: { username: string, password: string } }>({
    defaultUser: [{
        username: 'alice',
        password: 'Qamania123'
    }, {option: true}],
    app: async ({app, defaultUser}, use) => {
        await app.loginPage.goto();
        await app.loginPage.isDisplayed();
        await app.loginPage.login(defaultUser);
        await use(app)
    },
})

export const testCaseDashboardTest = uiLoggedUserTest.extend({
    app: async ({app}, use) => {
        await app.tcDashboardPage.goto()
        await use(app)
    }
})

export const expect = baseExpect