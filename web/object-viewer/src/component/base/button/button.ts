import {BaseComponent} from "@core/base-component";
import {IButtonOptions} from "@/component/base/button/type.button";
import {IComponentOptions} from "@types";

export default class Button extends BaseComponent {
    static _selector = "button"
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: Button._selector
        }
    }
    constructor(readonly _options: IButtonOptions) {
        const {text, ...baseOption } = _options
        const merge = {...baseOption, ...Button._componentOptions}
        super({...merge})
    }

    toHtml(): string {
        return `<button data-key="${Button._selector}">${this._options.text}</button>`
    }


    onClick(event: Event): void {
        event.stopPropagation()
        event.preventDefault()
    }
}