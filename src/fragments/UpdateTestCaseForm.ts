import {Base} from "@base/Base";
import {Page} from "@playwright/test";
import {TextElement, Input} from "@components";
import {boxStep} from "@helpers";


export class UpdateTestCaseForm extends Base {
    // TODO Investigate how to treat selectors like that

    private readonly title = new TextElement(this.page, 'Title', 'h3')
    private readonly testIdRow =
        new TextElement(this.page, 'TC id row', this.getChildElement(['p:nth-child(2)']))
    private readonly testNameInput =
        new Input(this.page, 'TC name input', this.root.locator('p:nth-child(3) input#id_name'))
    // private readonly testNameInput =
        // new Input(this.page, 'TC name input', this.getChildElement(['p:nth-child(3)', 'input#id_name']))
    private readonly descriptionInput = new Input(this.page, 'Description input', this.root.locator('p:nth-child(6) textarea#id_description'))
    constructor(page: Page) {
        super(page, 'div.updateForm', 'Update Test Case Form');
    }

    @boxStep
    public async fillNewTCName(name: string): Promise<void> {
        await this.testNameInput.fill(name)
    }
    @boxStep
    public async getDescription(): Promise<string> {
        return await this.descriptionInput.getInputValue()
    }

}