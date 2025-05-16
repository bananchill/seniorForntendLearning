const defaultOnFulfilledHandler = (x) => x;
const defaultOnRejectedHandler = (err) => { throw err; };

class CustomPromise {
    // BEGIN
    constructor(executor) {
        this.states = {
            pending: 'pending',
            fulfilled: 'fulfilled',
            rejected: 'rejected',
        };
        this.PromiseResult = null;
        this.PromiseState = this.states.pending;
        this.PromiseRejectReactions = [];
        this.PromiseFulfillReactions = [];

        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (err) {
            this.reject(err);
        }
    }

    resolve(result) {
        if (this.PromiseState !== this.states.pending) {
            return;
        }

        this.PromiseState = this.states.fulfilled;
        this.PromiseResult = result;
        this.PromiseFulfillReactions.forEach((onFulfilled) => onFulfilled(result));
    }

    reject(error) {
        if (this.PromiseState !== this.states.pending) {
            return;
        }
        this.PromiseState = this.states.rejected;
        this.PromiseResult = error;
        this.PromiseRejectReactions.forEach((onRejected) => onRejected(error));
    }

    catch(onRejectedHandler) {
        return this.then(defaultOnFulfilledHandler, onRejectedHandler);
    }
    // END

    then(onFulfilledHandler, onRejectedHandler = defaultOnRejectedHandler) {
        return new CustomPromise((resolve, reject) => {
            // BEGIN
            const onFulfilledReaction = (result) => {
                try {
                    resolve(onFulfilledHandler(result));
                } catch (e) {
                    reject(e);
                }
            };

            const onRejectedReaction = (error) => {
                try {
                    resolve(onRejectedHandler(error));
                } catch (e) {
                    reject(e);
                }
            };

            if (this.PromiseState === this.states.fulfilled) {
                setTimeout(() => onFulfilledReaction(this.PromiseResult), 0);
                return;
            }

            if (this.PromiseState === this.states.rejected) {
                setTimeout(() => onRejectedReaction(this.PromiseResult), 0);
                return;
            }

            this.PromiseFulfillReactions.push(onFulfilledReaction);
            this.PromiseRejectReactions.push(onRejectedReaction);
            // END
        });
    }
}

export default CustomPromise;