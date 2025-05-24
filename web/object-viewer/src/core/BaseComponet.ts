import {DomListener} from "@core/DomListener";
import {IComponentBaseOption, IDom} from "@/types";

export class ExcelComponent extends DomListener {
    constructor(_app: IDom, options: IComponentBaseOption) {
        super(_app, options.listeners);
    }

    /**
     * Возвращает шаблон компонента
     * @return {string}
     * */
    toHTML() {
        return '';
    }

    init() {
        this.initDomListeners();
    }
    destroy() {
        this.removeDomListeners();
    }
}