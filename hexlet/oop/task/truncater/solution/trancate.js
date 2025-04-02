/**
 * @typedef {Object} Trancate
 * @property {number} length - максимальная длина исходной строки. Если строка не длиннее, чем эта опция, то возвращается исходная строка.
 * @property {string} separator - символ, заменяющий обрезанную часть строки
 * */


export default class Truncater {

    /**
     * @param {Trancate} options Объект настроек
     * */
    constructor(options) {
        const defaultOptions = {
            separator: '...',
        };

        this._options = {...defaultOptions, ...options};
    }

    /**
     * @param {string} str
     * @param {Trancate} options Объект настроек
     * */
    truncate(str, options) {
        const length = options?.length ||  this._options.length;
        if(!length || str.length <= length) {
            return str;
        }

        const separator = options?.separator ??  this._options.separator;

        const separatorStr = String(str).substring(0, length);

        return separatorStr + separator;
    }
}