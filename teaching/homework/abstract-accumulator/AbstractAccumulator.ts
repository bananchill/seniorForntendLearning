export abstract class AbstractAccumulator {
    protected _value = 0;

    protected constructor(value = 0) {
        this._value = value;
        this.read();
    }

    read() {
        throw new Error("Method read() must be overridden");
    }
}