import {EventBus} from "@core/evet-bus";
import {IDom} from "@/types/dom";
import {IInstanceComponent} from "@/types/component";
import {IInstanceControllers} from "@/types/controllers";
export * from "./dom";
export * from "./component";
export * from "./controllers";

export interface IDefaultOptionComponent {
    bus: EventBus;
    root: IDom;
}

export interface IEventListenerOptions<Listeners = string> extends IDefaultOptionComponent{
    listeners?: Listeners[];
}

export type TInstanceInitialize<T = any> = IInstanceControllers<T> | IInstanceComponent<T>






