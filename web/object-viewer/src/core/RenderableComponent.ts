import {Dom} from "@core/Dom";
import {IBaseRenderOptions, IComponentBase, IComponentConstructorBase} from "@/types/viewer.types";
import {IDom} from "@/types";

export class RenderableComponent {
    private _app: IDom;
    private _options: IBaseRenderOptions;
    _components: IComponentBase[] = [];

    constructor(selector: string, options: IBaseRenderOptions) {
        this._app = new Dom(selector);
        this._options = options || {};
    }

    get app() {
        return this._app;
    }

    private create(tagName: string, classes = ''): IDom {
        const el = document.createElement(tagName);
        if (classes) {
            el.classList.add(classes);
        }
        return new Dom(el);
    }

    private createRoot() {
        return this.create('div', '');
    }

    appendComponent(Component: IComponentConstructorBase, data?: any) {
        const _el = this.create('div', Component._className);
        const newComponent = new Component(_el, this._options.bus);
        _el.html(newComponent.toHtml(data));
        newComponent.init()
        this._app.append(_el);
        this._components.push(newComponent);
        return this;
    }

    getRoot() {
        const $root = this.createRoot()

        this._components = this._options.components.map((Component) => {
            const _el = this.create('div', Component._className);

            const component = new Component(_el, this._options.bus);

            _el.html(component.toHtml());

            $root.append(_el);

            return component;
        });

        return $root;
    }


    render() {
        this._app.append(this.getRoot());

        this._components.forEach((component) => {
            component.init();
        });
    }

}