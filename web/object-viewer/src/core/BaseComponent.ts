import {DomListener} from "@core/DomListener";
import {IEventListenerOptions, IDom} from "@/types";
import {IComponentBase} from "@/types/viewer.types";

export class BaseComponent extends DomListener implements IComponentBase {
    static readonly _className: string;

    constructor(readonly _el: IDom, readonly _options: IEventListenerOptions) {
        super(_el, _options);
    }

    /**
     * Возвращает шаблон компонента
     * @return {string}
     * */
    toHtml(data: any): string {
        return '';
    }

    init() {
        this.initDomListeners();
    }

    destroy() {
        this.removeDomListeners();
    }
}