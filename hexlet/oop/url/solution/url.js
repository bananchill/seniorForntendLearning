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

    }
}

const url = new Url('http://yandex.ru:80?key=value&key2=value2');

console.log(url.getScheme());