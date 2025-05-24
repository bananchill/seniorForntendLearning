import ObjectViewerModel from "@/mvc/model";
import ObjectViewerView from "@/app/viewer/Viewer";
import {IBaseRenderOptions} from "@/types/viewer.types";

// Controller
export default class App {
    viewerView: ObjectViewerView;
    viewerModel: ObjectViewerModel;

    constructor(selector: string,  options: IBaseRenderOptions ) {
        this.viewerView = new ObjectViewerView(selector, options)
        this.viewerModel = new ObjectViewerModel()
    }

    start(): void {
        this.viewerView.render()
    }
}