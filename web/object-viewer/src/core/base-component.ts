import {IComponentOptions, IComponentProps, IDom} from "@/types";
import {DomListener} from "@core/dom-listener";
import {createComponent, initializeAndMount} from "@utils/component/base";

export class BaseComponent extends DomListener {
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

    replaceComponentBySelector(
        _element: IDom,
        selector: string,
    ): this {
        // 1. Контейнер, куда монтируем
        const container = (this._options.root.el
            .getElementsByClassName(selector)[0] as HTMLElement)

        if (!container) {
            console.warn(`[BaseComponent] container ".${selector}" not found`);
            return this;
        }

        // 2. Массив новых нод (clone, чтобы не "утащить" из исходного компонента)
        const incoming = Array.from(_element.el.children).map((node ) =>
            node.cloneNode(true),
        ) as HTMLElement[];

        // 3. Добавление / замена
        incoming.forEach((newNode) => {
            const key = newNode.dataset.key;
            if (!key) {
                container.append(newNode);
                return;
            }

            const current = container.querySelector<HTMLElement>(`[data-key="${key}"]`);
            if (!current) {
                container.append(newNode); // 3.4
            } else if (!current.isEqualNode(newNode)) {
                current.replaceWith(newNode); // 3.3
            }
        });

        const incomingKeys = new Set(
            incoming.map((n) => n.dataset.key).filter(Boolean) as string[],
        );

        Array.from(container.querySelectorAll<HTMLElement>('[data-key]')).forEach(
            (node) => {
                const key = node.dataset.key;
                if (key && !incomingKeys.has(key)) {
                    node.remove();
                }
            },
        );


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

