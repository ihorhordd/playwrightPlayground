import {Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import {Input} from "@components/Input";
import {Button} from "@components/Button";
import {Link} from "@components/Link";


export class LoginPage extends BasePage {

    public readonly userNameInput = new Input(this.page, 'Username Input','input[name="username"]')
    public readonly passwordInput = new Input(this.page, 'Password Input','input[name="password"]')
    private readonly dontHaveAccountLink = new Link(this.page,'Dont have account link', 'a[href="/register/"]')
    public readonly loginButton = new Button(this.page,'Login button','[value="Login"]' )

    constructor(page: Page) {
        super(page, 'http://127.0.0.1:8000/login/?next=/');
    }


    public fillUserName(username: string): Promise<void>{
        return this.userNameInput.fill(username)
    }

    public fillPassword(password: string): Promise<void>{
        return this.passwordInput.fill(password)
    }

    public clickDontHaveAccount(): Promise<void>{
        return this.dontHaveAccountLink.click()
    }

    public clickLoginButton(){
        return this.loginButton.click()
    }

}