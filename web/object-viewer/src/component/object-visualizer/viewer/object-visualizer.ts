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
            class: ObjectVisualizer._selector,
            'data-key': ObjectVisualizer._selector
        },
        childElements: []
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
        const el = this.toHtml(this.getObject?.())

        this.replaceComponentBySelector(el, ObjectVisualizer._selector);
    }

    hideCurrentLvl() {
        this.prevLvl?.()
        this.replaceComponentBySelector(this.toHtml(this.getObject?.()), ObjectVisualizer._selector,);
    }

    paintFirstLvl() {
        this.appendComponentByClass(this.toHtml(this.getObject?.()), ObjectVisualizer._selector)
    }

    private getCurrentKey(key: string, lvl = 0) {
        return `${key}_${lvl}`
    }

    private visibleRecursive(path: string, lvl = 0) {
        const splitPath = path.split(".");
        const data = this.getObject?.();

        if (splitPath[0]) {
            return this.toHtml(data, lvl)
        }

        let dataByPath = splitPath.reduce((acc, el) => {
            if (!acc) {
                return data[el]
            }
            return acc[el]
        }, {} as Record<string, any>)

        return this.toHtml(dataByPath, lvl)
    }

    toHtml<T = IDom>(data: any, nestedLvl = 0): T {
        if (!this.isObject(data)) {
            return createComponent('div', {attrs: {data: 'No Data'}, childElements: []}) as T;
        }

        const root = createComponent('div', {text: '{', attrs: {'data-key': `root_${nestedLvl}`}, childElements: []});

        Object.entries(data).forEach(([dataKey, dataEl]) => {
            const currentKey = this.getCurrentKey(dataKey, nestedLvl);
            const node = this.createNode({dataKey, dataEl, currentKey, nestedLvl});

            root.append(node);
            this.handleNestedObject(node, dataKey, dataEl, nestedLvl);
        });

        root.el.innerHTML += '}'

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
            childElements: [createComponent('div', {
                text: `${dataKey}:`,
                childElements: []
            })],
        };
        if (this.isObject(dataEl)) {
            const lvl = this.getCurrentLvl?.() ?? 0;
            if (lvl > nestedLvl && this.getHistoryElById?.(currentKey)) {
                nestedLvl += 1;
                options.childElements?.push(this.toHtml(dataEl, nestedLvl));
            } else {
                options.childElements?.push(createComponent('div', {text: "{ ... }", childElements: []}));
            }
        } else if (dataKey === "$ref") {
            options.childElements?.push(this.visibleRecursive(dataEl as string, nestedLvl));
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