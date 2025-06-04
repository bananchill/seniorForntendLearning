// import ObjectViewerView from "@/app/viewer/Viewer";
// import {IBaseRenderOptions} from "@/types/viewer.types";
// import {EventObjectData} from "@types";
// import Store from "@/data/Store";
// import ObjectVisualizer from "@/component/object-visualizer/viewer/ObjectVisualizer";
// import {EventObject} from "@/types/events";
//
// export default class AppController {
//     _viewerView: ObjectViewerView;
//     _viewerModel: Store;
//
//     constructor(selector: string, readonly _options: IBaseRenderOptions) {
//         this._viewerView = new ObjectViewerView(selector, _options)
//         this._viewerModel = new Store()
//
//         this.setNewObject = this.setNewObject.bind(this)
//     }
//
//     start(): void {
//         this._viewerView.render()
//         this.subscribeEvents()
//     }
//
//
//     createObjectComponent() {
//         this._viewerView.appendComponent(ObjectVisualizer,  this._viewerModel.object);
//     }
//
//     setNewObject(obj: EventObjectData): void {
//         this._viewerModel.object = obj
//         this.createObjectComponent()
//     }
//
//     nextLvl() {
//
//         this._viewerModel.currentLvl += 1
//     }
//
//     prevLvl() {
//
//
//         this._viewerModel.currentLvl -= 1
//     }
//
//
//     subscribeEvents(): void {
//         this._options.bus.on(EventObject.Set, this.setNewObject)
//         this._options.bus.on(EventObject.Next, this.nextLvl)
//         this._options.bus.on(EventObject.Prev, this.prevLvl)
//     }
// }