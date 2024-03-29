import {Page} from "@playwright/test";
import {BasePage} from "@base/BasePage";
import {Input, Button, Link} from "@components";
import {boxStep} from "@helpers";
import {test} from "@fixture";
import {User} from "@types";


export class LoginPage extends BasePage {

    public readonly userNameInput = new Input(this.page, 'Username Input', this.root, 'input[name="username"]')
    public readonly passwordInput = new Input(this.page, 'Password Input', this.root, 'input[name="password"]')
    private readonly dontHaveAccountLink = new Link(this.page, 'Dont have account link', this.root, 'a[href="/register/"]')
    public readonly loginButton = new Button(this.page, 'Login button', this.root, '[value="Login"]')

    constructor(page: Page) {
        super(page, 'Login Page', 'http://127.0.0.1:8000/login/?next=/', 'main.mainLogin');
    }

    @boxStep
    public fillUserName(username: string): Promise<void> {
        return this.userNameInput.fill(username)
    }

    @boxStep
    public fillPassword(password: string): Promise<void> {
        return this.passwordInput.fill(password)
    }

    @boxStep
    public clickDontHaveAccount(): Promise<void> {
        return this.dontHaveAccountLink.click()
    }

    @boxStep
    public clickLoginButton(): Promise<void> {
        return this.loginButton.click()
    }

    @boxStep
    public async login(user: User) {
        await test.step(`Login as ${user.username}`, async () => {
            await this.fillUserName(user.username)
            await this.userNameInput.shouldHaveValue(user.username)
            await this.passwordInput.shouldBeVisible()
            await this.fillPassword(user.password)
        })
        await this.clickLoginButton()
    }

}