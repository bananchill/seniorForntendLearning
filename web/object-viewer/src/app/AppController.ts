import ObjectViewerView from "@/app/viewer/Viewer";
import {IBaseRenderOptions} from "@/types/viewer.types";

// Controller
export default class AppController {
    _viewerView: ObjectViewerView;
    _viewerModel: any;

    constructor(selector: string, readonly _options: IBaseRenderOptions) {
        this._viewerView = new ObjectViewerView(selector, _options)
        this._viewerModel = ''
    }

    start(): void {
        this._viewerView.render()
        this.subscribeEvents()
    }


    subscribeEvents(): void {
        this._options.bus.on('file:data', (event: Event) => {
            console.log(event, 333)
        })
    }
}