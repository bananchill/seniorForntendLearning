function productExceptSelf(nums: number[]): number[] {
	const result: number[] = []
	let countZero = 0
	const multiple = nums.reduce((acc, el) => {
		if (el === 0) {
			countZero++
			return acc
		}
		return (acc *= el)
	}, 1)

	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === 0 && countZero === 1) {
			result[i] = multiple
		} else if ((countZero === 1 && nums[i] !== 0) || countZero > 1) {
			result[i] = 0
		} else {
			result[i] = multiple / nums[i]
		}
	}

	return result
}

console.log(productExceptSelf([0, 1]))
