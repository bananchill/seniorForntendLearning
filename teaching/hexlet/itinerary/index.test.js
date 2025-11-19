// @ts-check

import itinerary from './itinerary'

describe('Itinerary', () => {
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

	it('route 1', () => {
		const route = ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']
		debugger
		expect(itinerary(tree, 'Dubna', 'Kostroma')).toEqual(route)
	})

	it('route 2', () => {
		const route = ['Borisovka', 'Belgorod', 'Kursk', 'Kurchatov']
		expect(itinerary(tree, 'Borisovka', 'Kurchatov')).toEqual(route)
	})

	it('route 3', () => {
		const route = ['Rzhev', 'Tver', 'Moscow']
		expect(itinerary(tree, 'Rzhev', 'Moscow')).toEqual(route)
	})

	it('route 4', () => {
		const route = ['Ivanovo', 'Moscow', 'Voronezh', 'Kursk']
		expect(itinerary(tree, 'Ivanovo', 'Kursk')).toEqual(route)
	})

	it('route 5', () => {
		const route = [
			'Rzhev',
			'Tver',
			'Moscow',
			'Voronezh',
			'Kursk',
			'Belgorod',
			'Borisovka',
		]
		expect(itinerary(tree, 'Rzhev', 'Borisovka')).toEqual(route)
	})

	it('route 6', () => {
		const route = ['Tver', 'Dubna']
		expect(itinerary(tree, 'Tver', 'Dubna')).toEqual(route)
	})
})
