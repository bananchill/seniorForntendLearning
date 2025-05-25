import {IDom} from "@types";
import Input from "@/component/base/input/Input";
import {EventBus} from "@/app/event/EvetBus";

export default class InputText extends Input {
    readonly _className = 'inputText';

    constructor(readonly _el: IDom, readonly eventBus: EventBus) {
        super(_el, {
            listeners: ['input'],
            bus: eventBus,
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