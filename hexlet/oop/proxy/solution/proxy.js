/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} password
 * @property {number} age
 * */


/**
 * @param {User} user
 *  @param {(keyof User)[]} protectedProps
 * */
export default function protect(user, protectedProps) {
    const checkingProtectedProps = (key) => {
        if (protectedProps.indexOf(key) !== -1) {
            throw new Error(`Error: Access to ${ key } is restricted`)
        }
    }
    return new Proxy(user, {
        get(target, key) {
            checkingProtectedProps(key)
            return Reflect.get(target, key)
        },

        set(target, key, value) {
            checkingProtectedProps(key)
            return Reflect.set(target, key, value)
        }
    })
}