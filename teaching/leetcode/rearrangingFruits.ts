const getSum = (data: number[]) => data.reduce((acc, el) => (acc += el))
function minCost(basket1: number[], basket2: number[]): number {
	const basketLength = basket1.length
	const basketLength2 = basket2.length

	if (
		basketLength !== basketLength2 ||
		basketLength === 0 ||
		basketLength2 === 0 ||
		basketLength % 2 !== 0 ||
		basketLength2 % 2 !== 0
	) {
		return -1
	}
	let cost = 0

	const all = [...basket1, ...basket2]

	const allMap = all.reduce((acc, el) => {
		acc[el] = (acc?.[el] ?? 0) + 1

		return acc
	}, {} as Record<number, number>)

	for (const key in allMap) {
		const count = allMap[key]

		if (count % 2 !== 0) return -1
	}

	return cost
}

/** basket1 = [4,4,4,4,3], basket2 = [1,4,1,2] */
console.log(minCost([4, 4, 4, 4, 3], [5, 5, 5, 5, 3]))
