import ObjectViewerView from "@/app/viewer/Viewer";
import {IBaseRenderOptions} from "@/types/viewer.types";
import {EventObjectData} from "@types";
import Store from "@/data/Store";
import ObjectVisualizer from "@/component/object-visualizer/ObjectVisualizer";

export default class AppController {
    _viewerView: ObjectViewerView;
    _viewerModel: Store;

    constructor(selector: string, readonly _options: IBaseRenderOptions) {
        this._viewerView = new ObjectViewerView(selector, _options)
        this._viewerModel = new Store()

        this.setNewObject = this.setNewObject.bind(this)
    }

    start(): void {
        this._viewerView.render()
        this.subscribeEvents()
    }


    visibleObject(lvl = 0) {
        if (lvl == 0) {
            this._viewerView.appendComponent(ObjectVisualizer,  this._viewerModel.object);
        }
    }

    setNewObject(obj: EventObjectData): void {
        this._viewerModel.object = obj
        this.visibleObject()
    }


    subscribeEvents(): void {
        this._options.bus.on('file:data', this.setNewObject)
    }
}