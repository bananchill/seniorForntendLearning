export default class Store {
    private _object: any
    constructor() {
    }

    set object(object: any) {
        this._object = object;
    }

    get object() {
        return this._object;
    }

}