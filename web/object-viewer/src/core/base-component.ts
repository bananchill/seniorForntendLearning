import {IComponentOptions, IDom} from "@/types";
import {DomListener} from "@core/dom-listener";
import {createComponent, initializeAndMount} from "@utils/component/base";

export class BaseComponent extends DomListener {
    static readonly _className: string;
    private _components: any[] = [];

    constructor(protected readonly _options: IComponentOptions) {
        super(_options)
        this.init = this.init.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    private createRoot() {
        return createComponent('div', '');
    }


    appendComponent(Component: any, data?: any) {
        const _el = createComponent('div', Component._className);
        const newComponent = new Component(this._options.bus);
        _el.html(newComponent.toHtml(data));
        newComponent.init()
        this._options.root.append(_el);
        this._components.push(newComponent);
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

    toHtml(data?: any) {
        return ''
    }

    init() {
        this.initDomListeners();
    }

    destroy() {
        this.removeDomListeners();
    }

}

