import {BaseComponent} from "@core/BaseComponent";
import {IDom, IEventListenerOptions} from "@types";

export default class ObjectVisualizer extends BaseComponent {
    readonly _className = "objectVisualizer";
    constructor(readonly _el: IDom, readonly _options: IEventListenerOptions) {
        super(_el, _options);
    }

    toHtml<Data = Record<string, any>>(data: Data): string {
        let html = ``



        return ``
    }
}