import Input from "@/component/base/input/Input";
import {IComponentOptions, IDom} from "@types";

export default class InputText extends Input {
    static readonly _className: string = 'inputText';

    constructor(readonly _options: IComponentOptions) {
        super({
            listeners: ['input'],
            bus: _options.bus,
            selector: 'div',
            root: _options.root,
        })


    }

    toHtml(): string {
        return `
             <label for="` + InputText._className + `">Вставьте объект</label>
             <input id="objectInput" type="text"/>`
    }


    onInput(event: Event): void {
        console.log(event);
    }
}