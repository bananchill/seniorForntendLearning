function maxProfit(prices: number[]): number {
	const length = prices.length

	if (length < 2) {
		return 0
	}

	if (length === 2) {
		const first = prices[0]
		const second = prices[1]

		return second > first ? second - first : 0
	}

	let sum = 0
	let minEl = prices[0]
	let maxEl = 0

	for (let index = 0; index < prices.length; index++) {
		const element = prices[index]
		if (element < minEl && index !== length - 1) {
			minEl = element
			maxEl = 0
		}
		if (element > maxEl) {
			maxEl = element
		}

		if (sum < maxEl - minEl) {
			sum = maxEl - minEl
		}
	}

	return sum
}

console.log(maxProfit([2, 1, 2, 1, 0, 1, 2]))
