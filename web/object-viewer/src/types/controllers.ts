import {IDefaultOptionComponent} from "@/types/index";

export interface IInstanceControllers<T> {
    new(_options: IDefaultOptionComponent): T;
}
