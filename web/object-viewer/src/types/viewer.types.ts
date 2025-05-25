import {EventBus} from "@/app/event/EvetBus";

export interface IBaseRenderOptions {
    components: IComponentConstructorBase[]
    bus: EventBus;
}

export interface IComponentConstructorBase {
    new(...args: any[]): IComponentBase;

    readonly _className: string;
}

export interface IComponentBase {
    toHtml<Data = any>(data?: Data): string;

    init(): void;

    destroy(): void;
}
