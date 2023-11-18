import {BaseComponent} from "./BaseComponent";


export class TextElement extends BaseComponent {

    public async getText(): Promise<string>{
        return await this.getInnerText(this.root)
    }

}