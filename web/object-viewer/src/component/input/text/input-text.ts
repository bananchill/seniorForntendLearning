import Input from "@/component/base/input/Input";
import {IComponentOptions, IComponentProps, IDom} from "@types";

export default class InputText extends Input {
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: "inputText"
        }
    }
    constructor(readonly _options: IComponentProps) {
        super({
            listeners: ['input'],
            bus: _options.bus,
            selector: 'div',
            root: _options.root,
        })


    }

    toHtml(): string {
        return `
             <label for="inputText">Вставьте объект</label>
             <input id="inputText" type="text"/>`
    }


    onInput(event: Event): void {
        console.log(event);
    }
}