import {BaseComponent} from "@core/base-component";
import {IComponentOptions, IComponentProps} from "@types";

export default class Input extends BaseComponent {
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: "inputBase"
        }
    }
    constructor(protected readonly _options: IComponentProps) {
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