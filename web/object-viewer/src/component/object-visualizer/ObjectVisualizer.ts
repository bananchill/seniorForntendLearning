import {BaseComponent} from "@core/BaseComponent";
import {IDom} from "@types";
import {EventBus} from "@/app/event/EvetBus";
import {detectType} from "@utils/type";
import {getColorByValue} from "@utils/color";

/**
 * Можно сделать отображение следующих уровней через генератор.
 * Но вопрос, как сделать скрытие?
 * https://chatgpt.com/c/683df11a-7220-8003-acc1-60b87db7b737
 * */
export default class ObjectVisualizer extends BaseComponent {
    readonly _className = "objectVisualizer";
    constructor(readonly _el: IDom, readonly  eventBus: EventBus) {
        super(_el, {
            listeners: [],
            bus: eventBus
        });
    }

   private isObject(data: any) {
        return detectType(data) === "object"
    }

    toHtml<Data = Record<string, any>>(data?: Data): string {
        if(!this.isObject(data)) {
            throw new Error(`${data} is not an object`);
        }

        let html = `<div> {`
        for (let dataKey in data) {
            if(this.isObject(data[dataKey])) {
                continue;
            }

            html += `<div style=\" color: ${getColorByValue(typeof data[dataKey])}\">${dataKey} </div>`
        }

        html += `} </div>`
        
        return html
    }
}