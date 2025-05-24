import {getListenerMethodName} from "@utils/string";
import {IDom, IIDomListener} from "@/types";

export class DomListener implements IIDomListener {
    [key: string]: any;

    constructor(private readonly _root: IDom, readonly _listeners: string[] = []) {
        if (!_root) {
            throw new Error('No $root provided for DomListener!');
        }
    }

    initDomListeners() {
        this._listeners.forEach((listener) => {
            const method = getListenerMethodName(listener);

            if (typeof this[method] !== "function") {
                throw new Error(`Method ${method} is not implemented in DomListener Component!`);
            }

            this[method] = this[method].bind(this);
            this._root.on(listener, this[method]);
        });
    }

    removeDomListeners() {
        this._listeners.forEach((listener) => {
            const method = getListenerMethodName(listener);
            if (!this[method]) {
                return;
            }
            this._root.off(listener, this[method]);
        });
    }
}


