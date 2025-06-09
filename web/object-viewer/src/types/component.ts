import { IEventListenerOptions, TInstanceInitialize} from "@/types/index";

export interface IComponentProps<Components = any,Listeners = string> extends IEventListenerOptions<Listeners> {
    selector?: string;
    childrenComponent?: TInstanceInitialize<Components>[];
    data?: any
}
export interface IInstanceComponent<T = any> {
    new(_options: IComponentProps): T;

    readonly _componentOptions: IComponentOptions;
}

export interface IBaseComponent {
    toHtml<T>(data: T): string;

    init(): void;

    destroy(): void;
}

export interface IComponentOptions {
    /** HTML-атрибуты */
    attrs?: Record<string, string>;
    /** Инлайновые стили */
    styles?: Partial<CSSStyleDeclaration>;
    /** Произвольные свойства/обработчики (например, onClick) */
    props?: Partial<HTMLElement>;

    data ?: Record<string, string>;

    text?: string | number | boolean;

    html?: string;
}