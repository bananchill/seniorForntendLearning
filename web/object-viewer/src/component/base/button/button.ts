import {BaseComponent} from "@core/base-component";
import {IButtonOptions} from "@/component/base/button/type.button";
import {IComponentOptions} from "@types";

export default class Button extends BaseComponent {
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: "button"
        }
    }
    constructor(readonly _options: IButtonOptions) {
        const {text, ...baseOption} = _options
        super({...baseOption, listeners: ['click']})
    }

    toHtml(): string {
        return `<button>${this._options.text}</button>`
    }


    onClick(event: Event): void {
        console.log(event);
    }
}