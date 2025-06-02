import {IDom} from "@types";
import Input from "@/component/base/input/Input";
import {EventBus} from "@/app/event/EvetBus";

export default class InputFile extends Input {
    static readonly _className = 'inputFile';
    _error: string | null = null;

    constructor(readonly _el: IDom, readonly eventBus: EventBus) {
        super(_el, {
            listeners: ['change'],
            bus: eventBus
        })

        this.onChange = this.onChange.bind(this)
    }

    toHtml(): string {
        return `
             <label for="` + InputFile._className + `">Выберете файл с объектом</label>
             <input id="inputFile" type="file" accept=".json"/>`
    }


    private readFileAsJson(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const parsed = JSON.parse(reader.result as string);
                    resolve(parsed);
                } catch {
                    reject(new Error('Некорректный JSON в файле'));
                }
            };

            reader.onerror = () => {
                reject(new Error('Ошибка чтения файла'));
            };

            reader.readAsText(file);
        });
    }

    async onChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;

        const isJsonMime = file.type === 'application/json';
        const hasJsonExt = /\.json$/i.test(file.name);
        if (!isJsonMime || !hasJsonExt) {
            this._error = 'Пожалуйста, выберите файл с расширением .json';
            return;
        }

        try {
            const data = await this.readFileAsJson(file);
            this.eventBus.emit('file:data', data);
        } catch (err) {
            this._error = (err as Error).message;
        }
    }
}