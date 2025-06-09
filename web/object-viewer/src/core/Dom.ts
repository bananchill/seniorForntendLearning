import {IDom} from "@types";


export class Dom implements IDom {
    _el: HTMLElement;

    constructor(selector: string | HTMLElement) {
        const element = typeof selector == 'string' ? document.querySelector<HTMLElement>(selector) : selector;

        if (!element) {
            throw new Error(`No DOM listener found for selector "${selector}"`);
        }

        this._el = element
    }

    html(html: string): IDom | string {
        if (typeof html === 'string') {
            this._el.innerHTML = html;
            return this;
        }

        // Получаем html строку и убираем пробелы
        return this._el.outerHTML.trim();
    }

    append(node: Dom | HTMLElement): IDom {
        const element = node instanceof Dom ? node._el : node;

        this._el.appendChild(element);
        return this;
    }

    clear(): Dom {
        this.html('');
        return this;
    }

    on(eventType: string, callback: any) {
        this._el.addEventListener(eventType, callback);
    }

    off(eventType: string, callback: any) {
        this._el.removeEventListener(eventType, callback);
    }

    getCoords() {
        return this._el.getBoundingClientRect();
    }

    findAll(selector: string) {
        return this._el.querySelectorAll(selector);
    }

    css(styles: Record<string, any> = {}) {
        Object.keys(styles).forEach((key) => {
            this._el.style[key as any] = styles[key];
        });
    }

    get data() {
        return this._el.dataset;
    }
}