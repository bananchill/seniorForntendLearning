import {BaseComponent} from "@core/BaseComponent";
import {IDom} from "@types";
import {EventBus} from "@/app/event/EvetBus";
import {detectType} from "@utils/type";
import {getColorByValue} from "@utils/color";
import {EventObject} from "@/types/events";

export default class ObjectVisualizer extends BaseComponent {
    readonly _className = "objectVisualizer";
    private _history: any = []
    private _currentPoint: number = 0;

    constructor(readonly _el: IDom, readonly eventBus: EventBus) {
        super(_el, {
            listeners: [EventObject.Next, EventObject.Prev],
            bus: eventBus
        });
    }

    private isObject(data: any) {
        return detectType(data) === "object"
    }

    private getLVLName() {
        return `${this._className}_${this._currentPoint}`;
    }

    private getCurrentNode() {
        return document.querySelectorAll(this.getLVLName());
    }

    invisibleCurrentLvl() {
        const currentLvlNode = this.getCurrentNode();
        if (!Object.keys(currentLvlNode).length) {
            return
        }


        this._currentPoint -= 1;
    }

    visibleNextLvl() {



        this._currentPoint += 1;
    }


    toHtml<Data = Record<string, any>>(data?: Data): string {
        if (!this.isObject(data)) {
            throw new Error(`${data} is not an object`);
        }

        let html = `<div> {`
        for (let dataKey in data) {
            if (this.isObject(data[dataKey])) {
                continue;
            }

            html += `<div data-lvl="${this.getLVLName()}" data-keyParent="${dataKey}" style=\" color: ${getColorByValue(typeof data[dataKey])}\"> ${dataKey} </div>`
        }

        html += `} </div>`

        return html
    }
}