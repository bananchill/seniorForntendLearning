// Мое
// function maxArea(height: number[]): number {
// 	let maxVolume = 0

// 	let maxHeight = 0

// 	for (let i = 0; i < height.length - 1; i++) {
// 		if (height[i] < maxHeight) {
// 			continue
// 		}
// 		maxHeight = height[i]
// 		for (let j = i + 1; j < height.length; j++) {
// 			const volume = Math.min(height[i], height[j]) * (j - i)
// 			maxVolume = Math.max(maxVolume, volume)
// 		}
// 	}

// 	return maxVolume
// }

function maxArea(heights: number[]): number {
	let maxWater = 0
	let l = 0
	let r = heights.length - 1

	while (l < r) {
		const height = Math.min(heights[r], heights[l])
		const width = r - l
		maxWater = Math.max(maxWater, height * width)

		if (heights[r] < heights[l]) {
			r--
		} else {
			l++
		}
	}

	return maxWater
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
