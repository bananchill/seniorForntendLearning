function insert(intervals: number[][], newInterval: number[]): number[][] {
	const result: number[][] = []
	let [start, end] = newInterval

	for (const interval of intervals) {
		// 1️⃣ Интервалы до newInterval (без пересечения)
		if (interval[1] < start) {
			result.push(interval)
		}
		// 2️⃣ Интервалы после newInterval (без пересечения)
		else if (interval[0] > end) {
			result.push([start, end])
			start = interval[0]
			end = interval[1]
		}
		// 3️⃣ Пересечение → расширяем newInterval
		else {
			start = Math.min(start, interval[0])
			end = Math.max(end, interval[1])
		}
	}

	// Добавляем последний объединенный интервал
	result.push([start, end])

	return result
}
