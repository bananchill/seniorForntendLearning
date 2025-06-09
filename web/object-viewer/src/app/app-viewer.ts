import {BaseComponent} from "@core/base-component";
import {EventBus} from "@core/evet-bus";
import { IDom, TInstanceInitialize} from "@types";

export default class AppViewer extends BaseComponent {
    constructor(_childrenComponent: TInstanceInitialize[], _eventBus: EventBus, _root: IDom) {
        super({
            listeners: [],
            selector: 'div',
            childrenComponent: _childrenComponent,
            bus: _eventBus,
            root: _root,
        });
    }
}