export interface IDom {
    _el: HTMLElement

    html(html: string): IDom | string

    clear(): IDom

    on(eventType: string, callback: any): void

    off(eventType: string, callback: any): void
    getCoords(): DOMRect

    findAll(selector: string): NodeListOf<Element>

    css(styles: Record<string, any>): void

    get data(): DOMStringMap
}

export interface IIDomListener {
    initDomListeners(): void;

    removeDomListeners(): void;

    readonly _listeners: string[]
}

export interface IComponentBaseOption {
    listeners: string[];
}