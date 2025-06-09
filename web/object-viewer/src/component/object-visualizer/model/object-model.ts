export default class ObjectModel {
    private _object: any
    private _currentLvl = 0
    private history = [];

    constructor() {}

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

    nextLvl() {
        this._currentLvl += 1;
    }

    prevLvl() {
        this._currentLvl -= 1;
    }

    hetObjectsCurrentLvl() {
        const currentObjects: Record<string, any>[] = [];
         Object.keys(this._object).map(el => {

        } );
    }
}