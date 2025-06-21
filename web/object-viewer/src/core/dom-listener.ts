import {getListenerMethodName} from "@utils/string";
import {IComponentProps, IIDomListener} from "@/types";

export class DomListener implements IIDomListener {
    [key: string]: any;
    constructor(protected readonly _options: IComponentProps) {
        this.subscribeEvent = this.subscribeEvent.bind(this);
        this.unsubscribeEvent = this.unsubscribeEvent.bind(this);
        this.initDomListeners = this.initDomListeners.bind(this);
        this.removeDomListeners = this.removeDomListeners.bind(this);
    }

    subscribeEvent(event: string, callback: Function) {
        this._options.root.on(event, callback);
    }

    unsubscribeEvent(event: string, callback: Function) {
        this._options.root.off(event, callback);
    }


    emitEventBus<Event extends string, Data = Object>(event: Event, data: Data) {
        this._options.bus.emit(event, data)
    }

    initDomListeners() {
        this._options.listeners?.forEach((listener) => {
            const method = getListenerMethodName(listener);

            if (typeof this[method] !== "function") {
                return;
            }

            this[method] = this[method].bind(this);
            this.subscribeEvent(listener, this[method]);
        });
    }

    removeDomListeners() {
        this._options.listeners?.forEach((listener) => {
            const method = getListenerMethodName(listener);
            if (!this[method]) {
                return;
            }
            this.unsubscribeEvent(listener, this[method]);
        });
    }

}


