import {getListenerMethodName} from "@utils/string";
import {IDom, IEventListenerOptions, IIDomListener} from "@/types";

export class DomListener implements IIDomListener {
    [key: string]: any;

    constructor(protected readonly _el: IDom, readonly _options: IEventListenerOptions) {
        if (!_el) {
            throw new Error('No $root provided for DomListener!');
        }

        this.subscribeEvent = this.subscribeEvent.bind(this);
        this.unsubscribeEvent = this.unsubscribeEvent.bind(this);
        this.initDomListeners = this.initDomListeners.bind(this);
        this.removeDomListeners = this.removeDomListeners.bind(this);
    }

    subscribeEvent(event: string, callback: Function) {
        this._el.on(event, callback);
    }

    unsubscribeEvent(event: string, callback: Function) {
        this._el.off(event, callback);
    }


    emitEventBus<Event extends string, Data = Object>(event: Event, data: Data) {
        this._options.bus.emit(event, data)
    }

    initDomListeners() {
        this._options.listeners.forEach((listener) => {
            const method = getListenerMethodName(listener);

            if (typeof this[method] !== "function") {
                throw new Error(`Method ${method} is not implemented in DomListener Component!`);
            }

            this[method] = this[method].bind(this);
            this.subscribeEvent(listener, this[method]);
        });
    }

    removeDomListeners() {
        this._options.listeners.forEach((listener) => {
            const method = getListenerMethodName(listener);
            if (!this[method]) {
                return;
            }
            this.unsubscribeEvent(listener, this[method]);
        });
    }

}


