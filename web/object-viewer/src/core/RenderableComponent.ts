import {Dom} from "@core/Dom";
import {IBaseRenderOptions, IComponentBase, IComponentConstructorBase} from "@/types/viewer.types";
import {IDom} from "@/types";

export class RenderableComponent {
    _el: IDom;
    private options: IBaseRenderOptions;
    components: IComponentBase[] = [];
    constructor(selector: string, options: IBaseRenderOptions) {
        this._el = new Dom(selector);
        this.options = options || {};
    }

    private create(tagName: string, classes= ''): IDom {
        const el = document.createElement(tagName);
        if (classes) {
            el.classList.add(classes);
        }
        return new Dom(el);
    }

    getRoot() {
        const $root = this.create('div', '');

        this.components = this.options.components.map((Component) => {
            const _el = this.create('div', Component.className);

            const component = new Component(_el);

            _el.html(component.toHtml());

            $root.append(_el);

            return component;
        });

        return $root;
    }

    render() {
        this._el.append(this.getRoot());

        this.components.forEach((component) => {
            component.init();
        });
    }
}