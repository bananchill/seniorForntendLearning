export type ResolveFn<T> = (value: T | ICustomPromise<T>) => void
export type RejectFn<T = any> = (error: T) => void
export type Executor<T> = (resolve: ResolveFn<T>, reject: RejectFn) => void


/**
 * Интерфейс экземпляра
 * */
export interface ICustomPromise<T> {
    then: (onFulfilled: ResolveFn<T> | undefined, onRejected: RejectFn) => ICustomPromise<T>
    catch: <TErr = T>(onRejected: RejectFn<TErr>) => ICustomPromise<T>
}


/**
 * Интерфейс для статических методов промиса
 * */
export interface ICustomPromiseConstructor {
    new<T>(executor: (resolve: ResolveFn<T>, reject: RejectFn) => void): Promise<T>;

    resolve: <T>(value: T | ICustomPromise<T>) => ICustomPromise<void>

    reject: <T = any>(error: any) => ICustomPromise<void>
}

declare var ICustomPromise: ICustomPromiseConstructor;