import {BaseComponent} from "@core/base-component";
import {IComponentOptions} from "@types";

export default class Input extends BaseComponent {
    static readonly _className: string = "inputBase"

    constructor(protected readonly _options: IComponentOptions) {
        super(_options)
    }

    toHtml(): string {
        return `
             <label for="inputBase">Вставьте объект</label>
             <input id="inputBase" type="text"/>`
    }


    onInput(event: Event): void {

    }
}