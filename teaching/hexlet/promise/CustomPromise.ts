import {Executor, ICustomPromise, ICustomPromiseConstructor, RejectFn, ResolveFn} from "./CustomPromise.types";

const state = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
};


export default class CustomPromise<T> implements ICustomPromise<T> {
    private value: T | undefined = undefined;
    state = state.PENDING;
    handlers = [];

    constructor(executor: Executor<T>) {
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

    static resolve<TRes>(value: TRes | ICustomPromise<TRes>) {
        return new CustomPromise<TRes>((resolve) => {
            resolve(value);
        });
    }

    private thenable(value: ICustomPromise<T>) {
        try {
            value.then(this.resolve, this.reject);
        } catch (err) {
            this.reject(err)
        }
    }

    resolve(value: T | ICustomPromise<T>) {
        if (this.state !== state.PENDING) return;

        if (value instanceof CustomPromise && typeof value.then === 'function') {
            this.thenable(value)
            return;
        }


        this.value = value as T;
        this.state = state.FULFILLED;

        this.processHandlers();
    }

    static reject<TErr = any>(error: TErr): ICustomPromise<never> {
        return new CustomPromise<never>((resolve, reject) => {
            reject(error);
        });
    }

    reject<TErr>(error: any) {
        if (this.state !== state.PENDING) return;

        if (error?.then && typeof error.then === 'function') {
            this.thenable(error);
        } else {
            this.state = state.REJECTED;
            this.value = error;

            this.processHandlers();
        }

    }

    private create(onFulfilled: ResolveFn<T> | undefined, onRejected: RejectFn): CustomPromise<T> {
        return new CustomPromise((resolve, reject) => {
            this.handlers.push({onFulfilled, onRejected, resolve, reject});
            this.processHandlers();
        });
    }

    then(onFulfilled: ResolveFn<T>, onRejected: RejectFn): CustomPromise<T> {
        return this.create(onFulfilled, onRejected);
    }

    catch<TErr = T>(onRejected: RejectFn<TErr>): CustomPromise<T> {
        return this.create(undefined, onRejected)
    }

    private processHandlers() {
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

    private handleResult(result: T | ICustomPromise<T>, resolve: ResolveFn<T>, reject: RejectFn) {
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

