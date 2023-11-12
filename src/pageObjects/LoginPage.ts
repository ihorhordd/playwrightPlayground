import {Page} from "@playwright/test";
import {BasePage} from "@base/BasePage";
import {Input, Button, Link} from "@components";
import {boxStep} from "@helpers";


export class LoginPage extends BasePage {

    public readonly userNameInput = new Input(this.page, 'Username Input', 'input[name="username"]')
    public readonly passwordInput = new Input(this.page, 'Password Input', 'input[name="password"]')
    private readonly dontHaveAccountLink = new Link(this.page, 'Dont have account link', 'a[href="/register/"]')
    public readonly loginButton = new Button(this.page, 'Login button', '[value="Login"]')

    constructor(page: Page) {
        super(page, 'http://127.0.0.1:8000/login/?next=/');
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

}