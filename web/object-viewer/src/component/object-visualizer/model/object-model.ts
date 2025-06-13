import {IHistory} from "@/component/object-visualizer/types";
import {IDom} from "@types";

export default class ObjectModel {
    private _object: any
    private _currentLvl = 0
    private _history: Record<string, IHistory> = {};

    constructor() {
        this.nextLvl = this.nextLvl.bind(this);
        this.prevLvl = this.prevLvl.bind(this);
        this.setHistoryEl = this.setHistoryEl.bind(this);
        this.getHistoryElById = this.getHistoryElById.bind(this);
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

    nextLvl() {
        this._currentLvl = this._currentLvl + 1;
    }

    prevLvl() {
        this._currentLvl = this._currentLvl - 1;
    }



    hetObjectsCurrentLvl() {
        const currentObjects: Record<string, any>[] = [];
         Object.keys(this._object).map(el => {

        } );
    }

    setHistoryEl(element: IDom, key: string, parentId: string) {
        this._history[key] = {
            el: element,
            parentId: parentId,
        };
    }

    getHistoryElById(id: string) {
        return this._history[id];
    }
}