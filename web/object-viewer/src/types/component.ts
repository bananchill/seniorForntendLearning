import { IEventListenerOptions, TInstanceInitialize} from "@/types/index";

export interface IComponentOptions<Listeners = string> extends IEventListenerOptions<Listeners> {
    selector?: string;
    childrenComponent?: TInstanceInitialize[];

}
export interface IInstanceComponent {
    new(_options: IComponentOptions): IBaseComponent;

    readonly _className: string;
}

export interface IBaseComponent {
    toHtml<T>(data: T): string;

    init(): void;

    destroy(): void;
}
