import Button from "@/component/base/button/button";
import {EButtonAction, IButtonOptions} from "@/component/base/button/type.button";
import {IComponentOptions} from "@types";

export default class ButtonVisible extends Button {
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: "button"
        }
    }
    constructor(readonly _options: IButtonOptions) {
        const merge = {..._options, listeners: ['click'], text: 'Отобразить'}
        super(merge)

        this._options = merge

        this.onClick = this.onClick.bind(this)
    }


    onClick(event: Event): void {
        event.preventDefault()
        this._options.bus.emit(EButtonAction.Visible, event)
    }
}