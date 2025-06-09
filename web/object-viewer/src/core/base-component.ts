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


    appendComponent(_element: IDom) {
        this._options.root.append(_element);
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

