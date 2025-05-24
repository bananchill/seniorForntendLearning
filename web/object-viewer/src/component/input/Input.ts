import {ExcelComponent} from "@core/BaseComponet";
import {IDom} from "@types";

export default class Input extends ExcelComponent {
    className = "inputObject"

    constructor(private readonly _app: IDom) {
        super(_app, {
            listeners: ['input'],
        })
    }

    toHtml(): string {
        return `
             <label for="objectInput">Вставьте объект</label>
             <input id="objectInput" type="text"/>`
    }


    onInput(event: Event): void {
        console.log(event);
    }
}