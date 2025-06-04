export default class Store {
    private _object: any
    private _currentLvl = 0

    constructor() {
    }

    set object(object: any) {
        this._object = object;
    }

    get object() {
        return this._object;
    }


    get currentLvl(): number {
        return this._currentLvl;
    }

    set currentLvl(value: number) {
        this._currentLvl = value;
    }
}