import {BaseComponent} from "@core/BaseComponent";
import {IEventListenerOptions, IDom} from "@types";

export default class Input extends BaseComponent {
    _className = "inputBase"

    constructor(readonly _el: IDom, readonly _options: IEventListenerOptions) {
        super(_el, _options)
    }

    toHtml(): string {
        return `
             <label for="inputBase">Вставьте объект</label>
             <input id="inputBase" type="text"/>`
    }


    onInput(event: Event): void {

    }
}