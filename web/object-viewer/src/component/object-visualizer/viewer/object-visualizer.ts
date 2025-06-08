import {detectType} from "@utils/type";
import {getColorByValue} from "@utils/color";
import {EventObject} from "@/types/events";
import {BaseComponent} from "@core/base-component";
import {IComponentOptions, IDefaultOptionComponent} from "@types";

const defaultOptions = {
    listeners: [EventObject.Next, EventObject.Prev],
    selector: 'div',
}

export default class ObjectVisualizer extends BaseComponent {
    readonly _className = "objectVisualizer";

    constructor(readonly _options: IComponentOptions) {
        const merge = {...defaultOptions, ..._options};

        super(merge);

        this._options = merge
    }

    private isObject(data: any) {
        return detectType(data) === "object"
    }

    onSetObject(data: Record<string, any>) {
    }



    // private getLVLName() {
    //     return `${this._className}_${this._currentPoint}`;
    // }

    // private getCurrentNode() {
    //     return document.querySelectorAll(this.getLVLName());
    // }

    // invisibleCurrentLvl() {
    //     const currentLvlNode = this.getCurrentNode();
    //     if (!Object.keys(currentLvlNode).length) {
    //         return
    //     }
    //
    //
    //      this._currentPoint -= 1;
    // }
    //
    // visibleNextLvl() {
    //
    //     this._currentPoint += 1;
    // }


    toHtml<Data = Record<string, any>>(data?: Data): string {
        if (!this.isObject(data)) {
            console.debug(`${data} is not an object`);
            return `<div> No Data </div>`
        }

        let html = `<div> {`
        for (let dataKey in data) {
            if (this.isObject(data[dataKey])) {
                continue;
            }

            html += `<div data-lvl="${1}" data-keyParent="${dataKey}" style=\" color: ${getColorByValue(typeof data[dataKey])}\"> ${dataKey} </div>`
        }

        html += `} </div>`

        return html
    }

}