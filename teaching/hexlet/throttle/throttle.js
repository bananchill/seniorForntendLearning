export default function (callback, timeout) {
	let timeId = null
	let trailing = null

	return function (...arg) {
		if (timeId) {
			trailing = arg
			return
		}
		timeId = setTimeout(() => {
			if (trailing) {
				callback(...trailing)
			}
			timeId = null
			trailing = null
		}, timeout)
		callback(...arg)
	}
}
