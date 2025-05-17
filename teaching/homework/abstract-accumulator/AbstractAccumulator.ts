export default class AbstractAccumulator {
    value = 0
    constructor(value = 0) {
        this.value = value;
        this.read();
    }

    read() {
        throw new Error("Method read() must be overridden");
    }
}