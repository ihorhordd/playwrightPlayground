import {DashboardPage, LoginPage, TestCaseDashboardPage} from "@pages";
import {Page} from "@playwright/test";

export class Application  {

    constructor(public page: Page ) {}

    public loginPage = new LoginPage(this.page)
    public dashboardPage = new DashboardPage(this.page)
    public tcDashboardPage = new TestCaseDashboardPage(this.page)
}