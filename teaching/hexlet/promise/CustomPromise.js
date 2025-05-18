const state = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
};

export default class CustomPromise {
    value = undefined;
    state = state.PENDING;
    handlers = [];

    constructor(executor) {
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        try {
            executor(this.resolve, this.reject);
        } catch (err) {
            if (typeof executor !== 'function') {
                throw new Error('Executor must be a function');
            }

            this.reject(err);
        }
    }

    static resolve(value) {
        return new CustomPromise((resolve) => {
            resolve(value);
        });
    }

    thenable(value) {
        try {
            value.then(this.resolve, this.reject);
        } catch (err) {
            this.reject(err)
        }
    }

    resolve(value) {
        if (this.state !== state.PENDING) return;

        if (value instanceof CustomPromise) {
            this.thenable(value)
            return;
        }

        if (value?.then && typeof value.then === 'function') {
            this.thenable(value);
        } else {
            this.value = value;
            this.state = state.FULFILLED;


            this.processHandlers();
        }
    }

    static reject(error) {
        return new CustomPromise((resolve, reject) => {
            reject(error);
        });
    }

    reject(error) {
        if (this.state !== state.PENDING) return;

        if (error?.then && typeof error.then === 'function') {
            this.thenable(error);
        } else {
            this.state = state.REJECTED;
            this.value = error;

            this.processHandlers();
        }

    }

    create(onFulfilled, onRejected) {
        return new CustomPromise((resolve, reject) => {
            this.handlers.push({onFulfilled, onRejected, resolve, reject});
            this.processHandlers();
        });
    }

    then(onFulfilled = (x) => x, onRejected) {
        return this.create(onFulfilled, onRejected);
    }

    catch(onRejected) {
        return this.create(undefined, onRejected)
    }

    processHandlers() {
        if (this.state === state.PENDING) return;

        setTimeout(() => {
            while (this.handlers.length) {
                const {onFulfilled, onRejected, resolve, reject} = this.handlers.shift();

                try {
                    if (this.state === state.FULFILLED) {
                        if (typeof onFulfilled === 'function') {
                            const result = onFulfilled(this.value);
                            this.handleResult(result, resolve, reject);
                        } else {
                            resolve(this.value);
                        }
                    } else if (this.state === state.REJECTED) {
                        if (typeof onRejected === 'function') {
                            const result = onRejected(this.value);
                            this.handleResult(result, resolve, reject);
                        } else {
                            reject(this.value);
                        }
                    }
                } catch (err) {
                    reject(err);
                }
            }
        }, 0);
    }

    handleResult(result, resolve, reject) {
        try {
            if (result instanceof CustomPromise) {
                result.then(resolve, reject);
            } else {
                resolve(result);
            }
        } catch (err) {
            reject(err);
        }
    }
}

