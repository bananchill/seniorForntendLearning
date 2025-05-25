import {IBaseRenderOptions} from "@/types/viewer.types";
import {RenderableComponent} from "@core/RenderableComponent";
import {string} from "yup";

export default class ObjectViewerView extends RenderableComponent {
    constructor(selector: string, options: IBaseRenderOptions ) {
        super(selector, options);
    }

}