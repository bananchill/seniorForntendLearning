import AbstractAccumulator from "./AbstractAccumulator";

export default class Accumulator extends AbstractAccumulator {
    value = 0;
    constructor(value = 0) {
        super(value);
        this.value = value;
    }

    read(value = 0) {
        this.value += value;
    }
}