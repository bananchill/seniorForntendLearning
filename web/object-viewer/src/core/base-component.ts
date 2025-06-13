import {IComponentOptions, IComponentProps, IDom} from "@/types";
import {DomListener} from "@core/dom-listener";
import {createComponent, initializeAndMount} from "@utils/component/base";

export class BaseComponent extends DomListener {
    static _selector = ""
    static readonly _componentOptions: IComponentOptions = {}
    private _components: any[] = [];

    constructor(protected readonly _options: IComponentProps) {
        super(_options)
        this.init = this.init.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    private createRoot() {
        return createComponent('div', {});
    }


    appendComponentByClass(_element: IDom, selector: string ) {
        const el =  this._options.root.el.getElementsByClassName(selector);
        el[0].append(_element.el);
        return this;
    }

    private diffDom(target: HTMLElement, source: HTMLElement): void {
        // 1. Синхронизация атрибутов узла
        Array.from(source.attributes).forEach(attr => {
            console.log(target.getAttribute(attr.name) !== attr.value)
            if (target.getAttribute(attr.name) !== attr.value) {
                target.setAttribute(attr.name, attr.value);
            }
        });
        Array.from(target.attributes).forEach(attr => {
            if (!source.hasAttribute(attr.name)) {
                target.removeAttribute(attr.name);
            }
        });

        // 2. Рекурсивная работа с детьми (только непосредственные)
        const incomingChildren = Array.from(source.children) as HTMLElement[];
        const processedKeys = new Set<string>();

        incomingChildren.forEach(incomingChild => {
            const key = incomingChild.dataset.key;

            // — Без ключа: работаем по позиции
            if (!key) {
                const idx = incomingChildren.indexOf(incomingChild);
                const currentChild = target.children[idx] as HTMLElement | undefined;

                if (!currentChild) {
                    target.append(incomingChild.cloneNode(true));
                } else if (!currentChild.isEqualNode(incomingChild)) {
                    target.replaceChild(incomingChild.cloneNode(true), currentChild);
                }
                return;
            }

            // — С ключом: ищем по data-key
            processedKeys.add(key);
            const currentByKey = target.querySelector<HTMLElement>(
                `:scope > [data-key="${key}"]`,
            );

            // 2.1 Новый узел
            if (!currentByKey) {
                target.append(incomingChild.cloneNode(true));
                return;
            } else if (!currentByKey.isEqualNode(incomingChild)) {
                target.replaceChild(incomingChild.cloneNode(true), currentByKey);
            }

            // 2.2 Рекурсивное сравнение
            this.diffDom(currentByKey, incomingChild);
        });

        // 3. Удаляем лишние узлы
        Array.from(target.querySelectorAll<HTMLElement>(
            ':scope > [data-key]',
        )).forEach(child => {
            const key = child.dataset.key;
            if (key && !processedKeys.has(key)) child.remove();
        });
    }

    replaceComponentBySelector(source: IDom, dataKey: string): this {
        const container = this._options.root.el
            .querySelector<HTMLElement>(`[data-key="${dataKey}"]`);

        if (!container) {
            console.warn(`[BaseComponent] container dataKey ".${dataKey}" not found`);
            return this;
        }

        // 1. Совпадает ключ контейнера — синхронизируем сразу весь контейнер
        if (container.dataset.key === source.el.dataset.key) {
            this.diffDom(container, source.el);
            return this;
        }

        // 2. Ищем дочерний элемент по ключу и дельта-обновляем
        const updatedEl = container.querySelector<HTMLElement>(
            `[data-key="${source.el.dataset.key}"]`,
        );

        if (!updatedEl) {
            console.warn(
                `[BaseComponent] updatedEl dataKey ".${source.el.dataset.key}" not found`,
            );
            return this;
        }

        this.diffDom(updatedEl, source.el);
        return this;
    }


    private getRoot() {
        const $root = this.createRoot()

        this._components = this._options.childrenComponent?.map((Component) => initializeAndMount(Component, {
            bus: this._options.bus,
            root: $root
        })).filter(el => !!el) ?? [];

        return $root;
    }


    get components(): any[] {
        return this._components;
    }

    render() {
        this._options.root.append(this.getRoot());

        this._components.forEach((component) => {
            component.init();
        });

    }

    toHtml<T>(...args: any[]): T | string {
       return ''
    }

    init() {
        this.initDomListeners();
    }

    destroy() {
        this.removeDomListeners();
    }

}

