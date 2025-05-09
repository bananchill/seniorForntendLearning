export default class CustomPromise {
    // результат resolve
    value;
    // pending | fulfilled
    state = "pending";
    handlers = [];

    constructor(executor) {
        this.resolve = this.resolve.bind(this);
        executor(this.resolve)
    }

    resolve(value) {
        if (this.state === "pending") {
            this.state = 'fulfilled';
            this.value = value;
            this.then = this.then.bind(this);
        }

        if (this.handlers.length) {
            this.handlers.map(el => el(this.value));
        }
    }

    then(onFulfilled) {
        let nextResolve;
        const newPromise = new CustomPromise((resolve) => {
            nextResolve = resolve;
        });

        const handler = (value) => {
            const res = onFulfilled(value);
            nextResolve(res);
        }

        if (this.state !== "fulfilled") {
            this.handlers.push(handler);
        } else {
            handler(this.value);
        }

        return newPromise;
    }
}
