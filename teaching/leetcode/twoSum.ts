// function twoSum(nums: number[], target: number): number[] {
// 	if (nums.length === 0) {
// 		return []
// 	}

// 	const map = nums.reduce((acc, el, index) => {
// 		const lastIndex = acc[el]

// 		acc[el] = lastIndex ? Math.max(lastIndex, index) : index

// 		return acc
// 	}, {} as Record<number, number>)

// 	let result: number[] = []

// 	for (let index = 0; index < nums.length; index++) {
// 		const element = nums[index]
// 		const difference = target - element

// 		const indexTwo = map[difference]

// 		if (indexTwo == index) {
// 			continue
// 		}
// 		if (indexTwo) {
// 			return (result = [index, indexTwo])
// 		}
// 	}

// 	return result
// }

function twoSum(nums: number[], target: number): number[] {
	if (nums.length === 0) {
		return []
	}
	let result: number[] = []
	const map: Record<number, number[]> = {}

	for (let index = 0; index < nums.length; index++) {
		const element = nums[index]
		const difference = target - element

		if (map[element]) {
			const el = map[element]
			el.push(index)
			result = el
			return result
		} else {
			map[difference] = [index]
		}
	}

	return result
}

console.log(twoSum([1, 3, 4, 2], 6))
