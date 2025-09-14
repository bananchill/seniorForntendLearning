/**
 *
 * 	Нужно узнать все комбинации, которые дают сумму target
 *
 * 1) Запускаем цикл по всем числам. Данный цикл служит для выбора первого числа
 * 2) В первом цикле создаем заполненный массив первым числом (Длина массива равна target\на число)
 * 3) Запускаем второй цикл с конца
 * 4) Заменяем последнее число на текущее, если оно меньше target
 */
function combinationSum(candidates: number[], target: number): number[][] {
	if (candidates.length === 0) {
		return []
	}

	if (candidates.length === 1) {
		return candidates[0] === target ? [candidates] : []
	}

	const res: number[][] = []

	const recTree = (startIndex: number, lastSum: number, arr: number[]) => {
		for (let i = startIndex; i < candidates.length; i++) {
			if (candidates[i] > lastSum) {
				continue
			}
			const nextSum = lastSum - candidates[i]

			if (nextSum === 0) {
				res.push([...arr, candidates[i]])
				continue
			}
			arr.push(candidates[i])
			recTree(i, lastSum - candidates[i], arr)
			arr.pop()
		}
	}

	recTree(0, target, [])
	return res
}

console.log(combinationSum([8, 7, 4, 3], 11))
