function merge(intervals: number[][]): number[][] {
	intervals.sort((a, b) => a[0] - b[0])

	let i = 0
	let j = 1
	let res = new Array()
	res.push(intervals[0])
	let lastIndex = res.length - 1
	while (i !== intervals.length - 1) {
		const current = res[lastIndex]
		const next = intervals[j]

		if (current[1] >= next[0]) {
			current[1] = Math.max(current[1], next[0], next[1])
			current[0] = Math.min(current[0], next[0])
			res[lastIndex] = current
		} else {
			res.push(next)
			lastIndex++
		}

		i++
		j++
	}

	return res
}

console.log(
	merge([
		[2, 3],
		[2, 2],
		[3, 3],
		[1, 3],
		[5, 7],
		[2, 2],
		[4, 6],
	])
)
