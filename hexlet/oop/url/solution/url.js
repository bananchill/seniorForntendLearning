/**
 * @typedef {Object} Url
 * @property   {string} host
 * @property   {string} scheme
 * */

export default class Url {
    /**
     * @param {string} url
     * */
    constructor(url) {
        this._url = url;
    }

    /**
     * @return {string}  возвращает протокол передачи данных (без двоеточия)
     * */
    getScheme() {
        return this._url.replace(/(:.*)/, '');
    }

    /**
     * @return {string}  возвращает имя хоста
     * */
    getHostName() {
        return this._url.replace(/(.*:\/\/)(.*?)([:?/].*)/, '$2');
    }

    /**
     * @return {Object<string, string>}  возвращает параметры запроса в виде пар ключ-значение объекта
     * */
    getQueryParams() {
        const strParams = this._url.replace(/(.*\?)(.*)/, '$2');

        return strParams.split('&').reduce((acc, param) => {
            const splittedParams = param.split('=');
            acc[splittedParams[0]] = splittedParams[1]

            return acc;
        }, {});
    }

    /**
     * получает значение параметра запроса по имени. Если параметр с переданным именем не существует, метод возвращает значение заданное вторым параметром (по умолчанию равно null)
     * @param {Array} args
     * @return {string | null}
     * */
    getQueryParam(...args) {
        const params = this.getQueryParams();

        let result = null

        args.forEach((key) => {
            const value = params[key]
            if (value) {
                result = value;
            }
        })

        return result ?? args?.[1] ?? null;
    }


    /**
     * @param {Url} urlObj
     * */
    equals(urlObj) {
        if(!(urlObj instanceof Url)) {
            return false;
        }

        return this._url === urlObj._url;
    }
}

const url = new Url('http://yandex.ru:80?key=value&key2=value2');

console.log(url.getScheme());
console.log(url.getHostName())
console.log(url.getQueryParams())