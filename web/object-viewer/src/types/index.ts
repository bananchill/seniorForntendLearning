import {EventBus} from "@/app/event/EvetBus";

export interface IDom {
    _el: HTMLElement

    html(html: string): IDom | string

    clear(): IDom

    on(eventType: string, callback: any): void

    off(eventType: string, callback: any): void

    getCoords(): DOMRect

    append(node: this | HTMLElement): IDom

    findAll(selector: string): NodeListOf<Element>

    css(styles: Record<string, any>): void

    get data(): DOMStringMap
}

export interface IIDomListener {
    readonly _options: IEventListenerOptions;

    initDomListeners(): void;

    removeDomListeners(): void;

    subscribeEvent(event: string, callback: Function): void;

    unsubscribeEvent(event: string, callback: Function): void;

    emitEventBus<Event extends string, Data = Object>(event: Event, data: Data): void;
}

export interface IEventListenerOptions<Listeners = string> {
    listeners: Listeners[];
    bus: EventBus
}


export type ICustomEvent<Data = Object> = CustomEvent<Data>