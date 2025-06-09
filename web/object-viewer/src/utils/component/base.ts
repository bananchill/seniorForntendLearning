import {Dom} from "@core/Dom";
import {BaseComponent} from "@core/base-component";
import {IComponentOptions, IComponentProps, IDom, IInstanceComponent, TInstanceInitialize} from "@types";

export const createComponent = (selector: string, {data = {}, props ={}, attrs = {}, styles = {}, html, text}: IComponentOptions = {}) => {
    const el = document.createElement(selector);
    Object.entries(attrs).forEach(([name, value]) => {
        el.setAttribute(name, value);
    });

    Object.entries(data).forEach(([key, value]) => {
        // dataset принимает только строки
        // userId → el.dataset.userId -> data-user-id
        (el.dataset as Record<string, string>)[key] = String(value);
    });


    Object.assign(el.style, styles);

    Object.assign(el, props);

    if (html !== undefined) {
        el.innerHTML = html;
    } else if (text !== undefined) {
        el.textContent = String(text);
    }
    return new Dom(el) as IDom;
}


export const initializeAndMount = (Component: TInstanceInitialize, _options: IComponentProps) => {
    const component = new Component(_options);
    if (component instanceof BaseComponent) {
        return mountComponent(component, (Component as IInstanceComponent)._componentOptions, _options);
    }

    // throw new Error(`Неизвестный тип для инициализации: ${Component.name}`);
    return mountController(component);
}

export const mountComponent = (instance: BaseComponent, _componentOptions: IComponentOptions, _options: IComponentProps): BaseComponent => {
    const _el = createComponent('div', _componentOptions);
    _el.html(instance.toHtml(_options.data))
    _options.root.append(_el);
    return instance;
}

export const mountController = (instance: any) => {
    instance.render();
    return null
}