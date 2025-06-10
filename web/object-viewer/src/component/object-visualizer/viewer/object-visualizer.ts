import {detectType} from "@utils/type";
import {getColorByValue} from "@utils/color";
import {EventObject} from "@/types/events";
import {BaseComponent} from "@core/base-component";
import {IComponentOptions, IComponentProps, IDefaultOptionComponent, IDom} from "@types";
import {createComponent} from "@utils/component/base";
import {createLogger} from "vite";

const defaultOptions = {
    listeners: [EventObject.Next, EventObject.Prev],
    selector: 'div',
}

export default class ObjectVisualizer extends BaseComponent {
    static _selector = "objectVisualizer"
    static readonly _componentOptions: IComponentOptions = {
        attrs: {
            class: ObjectVisualizer._selector
        }
    }
    private nextLvl: Function | null = null
    private prevLvl: Function | null = null
    private getObject: Function | null = null
    private getCurrentLvl: Function | null = null
    private getHistoryElById: Function | null = null
    private setHistoryEl: Function | null = null


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

    bindGetCurrentLvl(handler: Function) {
        this.getCurrentLvl = handler;
    }

    bindGetObject(handler: Function) {
        this.getObject = handler
    }

    bindGetHistoryElById(handler: Function) {
        this.getHistoryElById = handler;
    }

    bindSetHistory(handler: Function) {
        this.setHistoryEl = handler;
    }

    visibleNextLvl() {
        this.nextLvl?.();
        this.replaceComponentBySelector(this.toHtml(this.getCurrentLvl?.() ?? 0, this.getObject?.()), ObjectVisualizer._selector);
    }

    hideCurrentLvl() {
        this.prevLvl?.()
        this.replaceComponentBySelector(this.toHtml(this.getCurrentLvl?.() ?? 0, this.getObject?.()), ObjectVisualizer._selector);
    }

    paintFirstLvl() {
        this.appendComponentByClass(this.toHtml(this.getCurrentLvl?.() ?? 0, this.getObject?.()), ObjectVisualizer._selector)
    }

    private getCurrentKey(key: string, lvl = 0) {
        return `${key}_${lvl}`
    }

    toHtml<T = IDom>(lvl = 0, data: any, nestedLvl = 0): T {
        if (!this.isObject(data)) {
            console.debug(`${data} is not an object`);
            return createComponent('div', {attrs: {data: 'No Data'}}) as T;
        }

        const root = createComponent('div', {text: '{'});

        Object.entries(data).forEach(([dataKey, dataEl]) => {
            const currentKey = this.getCurrentKey(dataKey, lvl);
            const node = this.createNode({dataKey, dataEl, currentKey, nestedLvl});

            root.append(node);
            this.handleNestedObject(node, dataKey, dataEl, lvl);
        });

        root.el.innerHTML += '}'

        console.log(root.html())
        return root as T;
    }

    /** Создаёт узел списка с учётом типа значения. */
    private createNode(
        data: {
            dataKey: string,
            dataEl: unknown,
            currentKey: string,
            nestedLvl: number,
        }
    ): IDom {
        let {dataEl, dataKey, currentKey, nestedLvl} = data
        const options: IComponentOptions = {
            styles: {color: getColorByValue(dataEl)},
            attrs: {'data-key': currentKey},
            data: {},
            text: '',
            childElement: undefined,
        };
        if (this.isObject(dataEl)) {
            const lvl = this.getCurrentLvl?.() ?? 0;
            options.text = `${dataKey}: {`

            if (lvl > nestedLvl && this.getHistoryElById?.(dataKey)) {
                nestedLvl += 1;
                options.childElement = this.toHtml(nestedLvl, dataEl);
            }
            options.text += '}';
        } else {
            options.text = `${dataKey}: ${JSON.stringify(dataEl)}`;
        }

        return createComponent('div', options);
    }

    /** Обрабатывает вложенные объекты (добавление в историю). */
    private handleNestedObject(
        node: IDom,
        dataKey: string,
        dataEl: unknown,
        lvl?: number,
    ): void {
        if (this.isObject(dataEl)) {
            const parentKey = this.getCurrentKey(dataKey, lvl ? lvl - 1 : 0);
            this.setHistoryEl?.(node, this.getCurrentKey(dataKey, lvl), parentKey);
        }
    }
}