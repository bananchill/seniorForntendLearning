import Button from "@/component/base/button/button";
import {EButtonAction, IButtonOptions} from "@/component/base/button/type.button";
import {IComponentOptions} from "@types";

export default class ButtonHidden extends Button {
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: "button"
        }
    }

    constructor(readonly _options: IButtonOptions) {
        const merge = {..._options, listeners: ['click'], text: 'Скрыть'}
        super(merge)

        this._options = merge

        this.onClick = this.onClick.bind(this)
    }


    onClick(event: Event): void {
        event.preventDefault()
        event.stopImmediatePropagation()
        this._options.bus.emit(EButtonAction.Hidden, event)
    }
}