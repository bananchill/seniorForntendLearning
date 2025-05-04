/**
 * @typedef {Object<string, string>} countryes
 * @property {string} name
 * @property {string} country
 * */

/**
 * @typedef {Object} duplicatedValue
 * @property {string} key - Уникальный ключ.
 * @property {string} value - Значение элемента.
 * */


const getMedian = (start, end) => Math.floor((end + start) / 2);

const binarySearchIndex = (mass, el, start, end) => {
    let median = getMedian(start, end);


    if (mass[median] < el) {
        return binarySearchIndex(mass, el, median + 1, end);
    }
    if (mass[median] > el) {
        return binarySearchIndex(mass, el, start, median - 1);
    }

    return median;
}

/**
 * Функция, получающая массив объектов типа countryes и использующая groupBy.
 *
 * @param {Array<countryes>} data - Массив объектов, описывающих страны.
 */
export default function normalize(data) {
    /** @type {duplicatedValue} */
    const duplicated = {}
    return data.reduce((acc, el) => {

        const {name, country} = el

        const nameNormalize = name.toLowerCase().trim()
        const countryNormalize = country.toLowerCase().trim()

        if (duplicated[nameNormalize]) {
            return acc;
        }

        if (!duplicated[nameNormalize]) {
            duplicated[nameNormalize] = true
        }

        if (!acc[countryNormalize]) {
            acc[countryNormalize] = []
        }

        debugger
        const index = binarySearchIndex(acc[countryNormalize], nameNormalize, 0, acc[countryNormalize].length);

        acc[countryNormalize].splice(index, 0, nameNormalize);

        return acc
    }, {})
}

const raw = [
    {name: 'istanbul', country: 'turkey'},
    {name: 'Moscow ', country: ' Russia'},
    {name: 'iStanbul', country: 'tUrkey'},
    {name: 'antalia', country: 'turkeY '},
    {name: 'samarA', country: '  ruSsiA'},
    {name: 'Miami', country: 'usa'},
];
console.log(normalize(raw));