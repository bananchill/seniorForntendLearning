import {IDefaultOptionComponent} from "@/types/index";

export interface IInstanceControllers {
    new(_options: IDefaultOptionComponent): any;
}
