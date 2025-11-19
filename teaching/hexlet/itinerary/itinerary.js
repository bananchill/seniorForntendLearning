const tree = [
	'Moscow',
	[
		['Smolensk'],
		['Yaroslavl'],
		[
			'Voronezh',
			[
				['Liski'],
				['Boguchar'],
				['Kursk', [['Belgorod', [['Borisovka']]], ['Kurchatov']]],
			],
		],
		['Ivanovo', [['Kostroma'], ['Kineshma']]],
		['Vladimir'],
		['Tver', [['Klin'], ['Dubna'], ['Rzhev']]],
	],
]

/**
 * 1) Реализовать функцию `itinerary`, которая находит маршрут между двумя городами.
 * 2) Поиск должен производиться в глубину.
 * 3) При поиске маршрута сохраняем города, только когда нашли совпадение
 * 4) Если первым нашли совпадение с городом откуда начинаем поиск, то добавляем его в маршрут
 * 	  1) Продолжаем поиск в глубину, если остались элементы, потому что элемент куда может быть там
 * 		2) Если нашли совпадение с городом куда, то добавляем его в маршрут и возвращаем true
 * 		3) Если не нашли элементы, то просто добавляем город и возвращаем true что нашли, дальше добавляем все города в маршрут
 * 5) Если первым нашли куда нужно
 * 		1) Если есть элементы дальше, то продолжаем спускаться
 * 		2) Если нашли совпадение с городом откуда начинаем поиск, то добавляем его в маршрут и возвращаем true
 * 		3) Заканчиваем поиск
 * 		4) Если не нашли, то добавляем совпадения и все города по маршруту
 * 6) Если первым был откуда, нам нужно перевернуть массив маршрута
 * 7) Если первым был куда, то возвращаем просто маршрут
 *
 */
export default function itinerary(tree, from, to) {
	const routeFrom = []
	const routeTo = []

	const isFrom = city => city === from
	const isTo = city => city === to

	const setFrom = value => {
		routeFrom.push(...value)
	}
	const setTo = value => {
		routeTo.push(...value)
	}

	const search = (node, route = []) => {
		const city = node[0]
		const children = node[1]

		if (typeof city === 'string') {
			route.push(city)
		}
		if (isFrom(city)) {
			setFrom(route)
		}

		if (isTo(city)) {
			setTo(route)
		}

		for (let i = 0; i < children?.length; i++) {
			search(children[i], [...route])
		}
	}

	search(tree)

	const maxLength = Math.max(routeTo?.length || 0, routeFrom?.length || 0)
	const normalizeRoute = []
	for (let i = 0; i < maxLength; i++) {
		const elTo = routeTo[i]
		const elFrom = routeFrom[i]
		const nextElFrom = routeFrom[i + 1]
		const nextElTo = routeTo[i + 1]

		if (elTo === elFrom && nextElFrom !== nextElTo) {
			normalizeRoute.push(
				...routeFrom.slice(i, routeFrom.length).reverse(),
				...routeTo.slice(i + 1, routeTo.length)
			)
			return normalizeRoute
		}
	}
}

console.log(itinerary(tree, 'Tver', 'Dubna'))
