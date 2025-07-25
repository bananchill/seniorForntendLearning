import Button from "@/component/base/button/button";
import {EButtonAction, IButtonOptions} from "@/component/base/button/type.button";
import {IComponentOptions} from "@types";

export default class ButtonVisible extends Button {
    static _selector = "buttonVisible"
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: ButtonVisible._selector,
            'data-key': ButtonVisible._selector
        }
    }

    constructor(readonly _options: IButtonOptions) {
        const merge = {..._options, listeners: ['click'], text: 'Отобразить'}
        super(merge)

        this._options = merge

        this.onClick = this.onClick.bind(this)
    }


    onClick(event: Event): void {
        const target = event.target as HTMLElement
        if (target.parentElement?.dataset.key !== ButtonVisible._selector) {
            return
        }
        event.preventDefault()
        event.stopImmediatePropagation()
        this._options.bus.emit(EButtonAction.Visible, event)
    }
}