import {Dom} from "@core/Dom";
import {BaseComponent} from "@core/base-component";
import {IDom, IInstanceComponent, TInstanceInitialize} from "@types";
import {EventBus} from "@core/evet-bus";

export const createComponent = (selector: string, classes?: string) => {
    const el = document.createElement(selector);
    if (classes) {
        el.classList.add(classes);
    }
    return new Dom(el);
}


export const initializeAndMount = (Component: TInstanceInitialize, _options: {
    bus: EventBus;
    root: IDom;
    data?: any;
}) => {
    const component = new Component({
        bus: _options.bus,
        root: _options.root
    });
    if (component instanceof BaseComponent) {
        return mountComponent(component, (Component as IInstanceComponent)._className, _options.root, _options.data);
    } else {
        return mountController(component);
    }

    throw new Error(`Неизвестный тип для инициализации: ${Component.name}`);
}

export const mountComponent = (instance: BaseComponent, className: string, $root: IDom, data?: any): BaseComponent => {
    const _el = createComponent('div', className);
    _el.html(instance.toHtml(data))
    $root.append(_el);
    return instance;
}

export const mountController = (instance: any) => {
    instance.render();
    return null
}