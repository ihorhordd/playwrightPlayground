import {Base} from "@base/Base";
import {Page} from "@playwright/test";
import {TextElement, Input, Button} from "@components";
import {boxStep} from "@helpers";


export class UpdateTestCaseForm extends Base {
    private readonly title = new TextElement(this.page, 'Title', this.root, 'h3')
    private readonly testIdRow = new TextElement(this.page, 'TC id row', this.root, 'p:nth-child(2)')
    private readonly testNameInput = new Input(this.page, 'TC name input', this.root, 'p:nth-child(3) input#id_name')
    private readonly descriptionInput = new Input(this.page, 'Description input', this.root, 'p:nth-child(6) textarea#id_description')
    private readonly updateButton = new Button(this.page, 'Confirm update button', this.root, 'div.btn input[type="submit"]')

    constructor(page: Page) {
        super(page, 'Update Test Case Form', 'div.updateForm');
    }

    @boxStep
    public async fillNewTCName(name: string): Promise<void> {
        await this.testNameInput.fill(name)
    }

    @boxStep
    public async getDescription(): Promise<string> {
        return await this.descriptionInput.getInputValue()
    }

    @boxStep
    public async getTitle(): Promise<string> {
        return await this.title.getText()
    }

    @boxStep
    public async getTestId(): Promise<number> {
        return parseInt(await this.testIdRow.getText());
    }

    @boxStep
    public async fillDescription(text: string): Promise<void> {
        await this.descriptionInput.fill(text)
    }

    @boxStep
    public async clearDescription() {
        await this.descriptionInput.clearInput()
    }

    @boxStep
    public async clickUpdateButton() {
        await this.updateButton.click()
    }

}