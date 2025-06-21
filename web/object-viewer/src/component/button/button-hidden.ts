import Button from "@/component/base/button/button";
import {EButtonAction, IButtonOptions} from "@/component/base/button/type.button";
import {IComponentOptions} from "@types";

export default class ButtonHidden extends Button {
    static _selector = 'button-hidden';
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: "button",
            'data-key': ButtonHidden._selector
        }
    }

    constructor(readonly _options: IButtonOptions) {
        const merge = {..._options, listeners: ['click'], text: 'Скрыть'}
        super(merge)

        this._options = merge

        this.onClick = this.onClick.bind(this)
    }


    onClick(event: Event): void {
        const target = event.target as HTMLElement
        if (target.parentElement?.dataset.key !== ButtonHidden._selector) {
            return
        }
        event.preventDefault()
        event.stopImmediatePropagation()
        this._options.bus.emit(EButtonAction.Hidden, event)
    }
}