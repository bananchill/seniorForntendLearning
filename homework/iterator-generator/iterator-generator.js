export default class Seq {

    constructor(start, callback, length = Infinity) {
        this._start = start;
        this._length = length;
        this._callback = callback;
        this._current = start;
        this.takeEl = 0;
    }

    calculateAndSetCurrent() {
        this._current = this._callback(this._current)
    }


    * [Symbol.iterator]() {
        yield this._current;
        for (let i = 0; i < this.takeEl - 1; i++) {
            this.calculateAndSetCurrent(this._current)
            yield this._current;
        }
        this._current = this._callback(this._current)
    }

    take(count) {
        if (this.takeEl !== 0) {
            this._current = this._start;
        }

        this.takeEl = count;
        return this;
    }

    skip(count) {
        if (this.takeEl !== 0) {
            this._current = this._start;
            this.takeEl = 0
        }

        for (let i = 0; i < count; i++) {
            this.calculateAndSetCurrent(this._current)
        }
        return this
    }
}
