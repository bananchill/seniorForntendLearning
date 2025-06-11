import AppViewer from "@/app/app-viewer";
import {EventBus} from "@core/evet-bus";
import InputText from "@/component/input/text/input-text";
import InputFile from "@/component/input/file/input-file";
import ObjectController from "@/component/object-visualizer/controller/object-controller";
import {IDom} from "@types";

export default class AppController {
    _viewer: AppViewer;

    constructor(_eventBus: EventBus, _root: IDom) {
        this._viewer = new AppViewer([InputText, InputFile, ObjectController], _eventBus, _root);
    }

    render() {
        this._viewer.render()
    }
}