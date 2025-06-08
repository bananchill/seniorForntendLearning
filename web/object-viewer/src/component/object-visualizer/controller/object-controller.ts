import {IDefaultOptionComponent} from "@types";
import ObjectModel from "@/component/object-visualizer/model/object-model";
import ObjectVisualizer from "@/component/object-visualizer/viewer/object-visualizer";
import {EventObject} from "@/types/events";
import {initializeAndMount} from "@utils/component/base";

export default class ObjectController {
    _viewerModel: ObjectModel
    _viewer: ObjectVisualizer | null = null;


    constructor(readonly _options: IDefaultOptionComponent) {
        this._viewerModel= new ObjectModel();
        this.subscribeEvents();
    }

    setObject(newObj: any) {
        this._viewerModel.object = newObj;

        this._viewer = initializeAndMount(ObjectVisualizer, {
            bus: this._options.bus,
            root: this._options.root,
            data: newObj
        }) as ObjectVisualizer
        console.log(newObj);
    }


    subscribeEvents(): void {
        this._options.bus.on(EventObject.Set, (event: any) => this.setObject(event))
        // this._eventBus.on(EventObject.Next, this.nextLvl)
        // this._eventBus.on(EventObject.Prev, this.prevLvl)
    }

    render(): void {
        if (this._viewer) {
            this._viewer?.render()
        }
    }
}