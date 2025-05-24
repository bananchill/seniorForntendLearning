export default class ObjectViewer  {
    constructor(private _object: any) {
    }

    set object(object: any) {
        this._object = object;
    }

    get object() {
        return this._object;
    }

}