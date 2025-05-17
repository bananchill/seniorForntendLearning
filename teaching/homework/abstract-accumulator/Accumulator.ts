import {AbstractAccumulator} from "./AbstractAccumulator";

export default class Accumulator extends AbstractAccumulator {
    constructor(value = 0) {
        super(value);
    }

    read(value = 0) {
        this._value += value;
    }

    get value() {
        return this._value;
    }
}