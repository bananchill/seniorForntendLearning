// @ts-check

/**
 * Создаёт экземпляр URL из строки.
 * @param {string} url
 * @returns {URL}
 */
export const make = url => {
	return new URL(url)
}

/**
 * Строковое представление URL.
 * @param {URL} url
 * @returns {string}
 */
export const toString = url => {
	return url.href
}

/**
 * Возвращает протокол (со двоеточием), напр. "https:".
 * Важно: тест ожидает именно такой формат.
 * @param {URL} url
 * @returns {string}
 */
export const getProtocol = url => {
	return url.protocol
}

/**
 * Возвращает хост (домен + порт, если есть), напр. "hexlet.io:8080".
 * @param {URL} url
 * @returns {string}
 */
export const getHost = url => {
	return url.host
}

/**
 * Возвращает путь (pathname), напр. "/community".
 * @param {URL} url
 * @returns {string}
 */
export const getPath = url => {
	return url.pathname
}

/**
 * Устанавливает протокол. Принимает "https:" или "https".
 * Модифицирует исходный URL по месту (in-place).
 * @param {URL} url
 * @param {string} protocol
 * @returns {void}
 */
export const setProtocol = (url, protocol) => {
	const p = protocol.endsWith(':') ? protocol : `${protocol}:`
	url.protocol = p
}

/**
 * Устанавливает хост. Принимает "example.com" или "example.com:3000".
 * Модифицирует исходный URL по месту (in-place).
 * @param {URL} url
 * @param {string} host
 * @returns {void}
 */
export const setHost = (url, host) => {
	url.host = host
}

/**
 * Устанавливает путь. Можно передавать с "/" или без — нормализуем.
 * Модифицирует исходный URL по месту (in-place).
 * @param {URL} url
 * @param {string} path
 * @returns {void}
 */
export const setPath = (url, path) => {
	url.pathname = path.startsWith('/') ? path : `/${path}`
}

/**
 * Возвращает значение query-параметра или дефолт, если параметра нет.
 * Сигнатура под тесты: getQueryParam(url, key, defaultValue?)
 * Пример из теста: getQueryParam(url, "low", "user") -> "user"
 * @param {URL} url
 * @param {string} key
 * @param {string | null} [defaultValue=null]
 * @returns {string | null}
 */
export const getQueryParam = (url, key, defaultValue = null) => {
	const value = url.searchParams.get(key)
	return value === null ? defaultValue : value
}

/**
 * Устанавливает (или добавляет) query-параметр.
 * Модифицирует исходный URL по месту (in-place).
 * @param {URL} url
 * @param {string} key
 * @param {string | number | boolean} value
 * @returns {void}
 */
export const setQueryParam = (url, key, value) => {
	url.searchParams.set(key, String(value))
}
