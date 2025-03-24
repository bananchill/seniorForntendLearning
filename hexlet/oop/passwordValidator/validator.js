/**
 * @typedef {Object} PasswordValidatorOptions
 * @property {boolean} containNumbers - Флаг, указывающий, что пароль должен содержать цифры.
 * @property {number} minLength - Минимальная длина пароля.
 */

const hasNumber = (string) => (string.search(/\d/) !== -1);


/**
 * Класс для валидации пароля.
 */
export default class PasswordValidator {

    /**
     * @param {PasswordValidatorOptions} options Объект настроек.
     */
    constructor(options) {
        this._options = Object.assign({}, {
            containNumbers: true,
            minLength: 8,
        }, options);
    }

    validate(password) {
        let objErr = {}

        if (password.length < this._options.minLength) {
            objErr['minLength'] = 'too small'
        }

        if (this._options.containNumbers && !hasNumber(password)) {
            objErr['containNumbers'] = "should contain at least one number";
        }

        return objErr;
    }
}