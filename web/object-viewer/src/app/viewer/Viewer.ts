import {IBaseRenderOptions} from "@/types/viewer.types";
import {RenderableComponent} from "@core/RenderableComponent";

export default class ObjectViewerView extends RenderableComponent {
    _app: HTMLElement | null = null
    _input: HTMLInputElement | null = null

    constructor(selector: string, options: IBaseRenderOptions ) {
        super(selector, options);
        this._app = document.getElementById("app");
    }


}