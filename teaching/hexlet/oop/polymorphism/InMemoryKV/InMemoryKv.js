import _ from "lodash";

export default class InMemoryKv {
    constructor(obj) {
        this.obj = {...obj};
    }

    get(key, value) {
        const objVal = this.obj?.[key] ?? null
        if (objVal === null && value) {
            return value;
        }

        return objVal;
    }

    set(key, value) {
        this.obj[key] = value;
    }

    unset(key, value) {
        if(value && this.obj[key] === value || !value) {
            delete this.obj[key];
            return null
        }
        return null
    }

    toObject() {
        return _.cloneDeep(this.obj);
    }
}