import {detectType} from "@utils/type";
import {getColorByValue} from "@utils/color";
import {EventObject} from "@/types/events";
import {BaseComponent} from "@core/base-component";
import {IComponentOptions, IComponentProps, IDefaultOptionComponent, IDom} from "@types";
import {createComponent} from "@utils/component/base";

const defaultOptions = {
    listeners: [EventObject.Next, EventObject.Prev],
    selector: 'div',
}

export default class ObjectVisualizer extends BaseComponent {
    readonly _className = "objectVisualizer";
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: "objectVisualizer"
        }
    }
    private nextLvl: Function | null = null
    private prevLvl: Function | null = null
    private getObject: Function | null = null
    private _history: any;

    constructor(readonly _options: IComponentProps) {
        const merge = {...defaultOptions, ..._options};

        super(merge);

        this._options = merge
    }

    private isObject(data: any) {
        return detectType(data) === "object"
    }

    bindNextLvl(handler: Function) {
        this.nextLvl = handler;
    }

    bindPrevLvl(handler: Function) {
        this.prevLvl = handler;
    }

    visibleNextLvl() {
        this.nextLvl?.()
    }

    hideCurrentLvl() {
        this.prevLvl?.()
    }

    bindGetObject(handler: Function) {
        this.getObject = handler
    }

    paintFirstLvl() {
        const el =this.toHtml(this.getObject?.())
        console.log(el)
        this.appendComponent(el)
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


    toHtml<T = IDom>(data?: any, lvl = 0): T {
        if (!this.isObject(data)) {
            console.debug(`${data} is not an object`);
            return createComponent('div', {attrs: {data: 'No Data '}}) as T
        }

        let html = createComponent('div', {
            text: '{'
        })
        for (let dataKey in data) {
            const componentOptions: IComponentOptions = {
                styles: {
                    color: getColorByValue(data[dataKey]),
                },
                attrs: {
                    'data-keyParent': `${dataKey}_${lvl}`,
                },
                data: {
                },
                text: `${dataKey}: ${this.isObject(data[dataKey]) ? '{}' : JSON.stringify(data[dataKey])}`,
            }
            const newEl = createComponent('div', componentOptions)
            // html += `<div data-keyParent="" style=\" color: ${}\"> ${dataKey}`
            // if (this.isObject(data[dataKey])) {
            //     html += `:{  ...  }, </div>`
            // } else {
            //     html += `: ${JSON.stringify(data[dataKey])}, </div>`
            // }

            html.append(newEl);
        }

        html.append(createComponent('div', {
            text: '}'
        }))

        return html as T
    }
}