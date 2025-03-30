/** @typedef {import('./course.js').Course} Course */

/**
 * @param {Course} course
 * */
export default function protect(course) {
    let allowPrivateAccess = false;
    const isPrivate = (key) => {
        return key.startsWith('_');
    }

    const isFunction = (value) => typeof value === 'function';

    const isOwn = (target, key) => {
        return Object.getOwnPropertyDescriptor(target, key)
    }

    return new Proxy(course, {
        get(target, key) {
            if (!target[key] || isPrivate(key)) {
                throw new Error()
            }

            let desc = isOwn(target, key);
            if (!desc) {
                desc = isOwn(Object.getPrototypeOf(target), key);
            }

            if (!desc) {
                throw new Error("");
            }


            if (typeof desc.value === 'function') {
                allowPrivateAccess = true;
                try {
                    return target[key]
                } finally {
                    allowPrivateAccess = false;
                }
            }

            return target[key];
        },
        set(target, key, value) {
            if (!target[key] || isPrivate(key)) {
                throw new Error("");
            }

            if (isFunction(target[key]) && isFunction(value)) {
                target[key] = value.bind(course);
                return target[key];
            }
            return Reflect.set(target, key, value);
        }
    })
}