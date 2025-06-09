import {IDefaultOptionComponent} from "@types";
import ObjectModel from "@/component/object-visualizer/model/object-model";
import ObjectVisualizer from "@/component/object-visualizer/viewer/object-visualizer";
import {EventObject} from "@/types/events";
import {initializeAndMount} from "@utils/component/base";
import ButtonVisible from "@/component/button/button-visible";
import {EButtonAction} from "@/component/base/button/type.button";
import ButtonHidden from "@/component/button/button-hidden";

export default class ObjectController {
    _viewerModel: ObjectModel
    _viewer: ObjectVisualizer | null = null;


    constructor(readonly _options: IDefaultOptionComponent) {
        this._viewerModel = new ObjectModel();
        this.subscribeEvents();
    }

    setObject(newObj: any) {
        this._viewerModel.object = newObj;

        this._viewer = initializeAndMount(ObjectVisualizer, {
            bus: this._options.bus,
            root: this._options.root,
            data: newObj,
            childrenComponent: [ButtonVisible, ButtonHidden]
        }) as ObjectVisualizer

        this._viewer.bindNextLvl(this._viewerModel.nextLvl)
        this._viewer.bindPrevLvl(this._viewerModel.prevLvl)
        this._viewer.bindGetObject(() => this._viewerModel.object)

        this._viewer.render()
        this._viewer.paintFirstLvl()
    }

    subscribeEvents(): void {
        this._options.bus.on(EventObject.Set, (event: any) => this.setObject(event))
        this._options.bus.on(EButtonAction.Visible, () => this._viewer?.visibleNextLvl())
        this._options.bus.on(EButtonAction.Hidden, () => this._viewer?.hideCurrentLvl())
    }

    render(): void {
    }
}