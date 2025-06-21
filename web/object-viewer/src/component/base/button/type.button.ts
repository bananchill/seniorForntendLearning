import {IComponentProps} from "@types";

export interface IButtonOptions extends IComponentProps {
    text?: string;
}


export enum EButtonAction {
    Visible = "Visible",
    Hidden = "Hidden",
}