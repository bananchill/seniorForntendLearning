// @ts-check

import transform from './transformer.js'

describe('transform', () => {
	describe('simple tree', () => {
		const tree = [
			'A',
			[
				['B', [['D']]],
				['C', [['E'], ['F']]],
			],
		]

		it('#simple test1', () => {
			const expected = ['B', [['A', [['C', [['E'], ['F']]]]], ['D']]]

			debugger
			const actual = transform(tree, 'B')
			expect(sortTree(actual)).toEqual(expected)
		})
	})

	describe('hard tree', () => {
		const tree = [
			'A',
			[
				['B', [['D', [['H']]], ['E']]],
				[
					'C',
					[
						[
							'F',
							[
								['I', [['M']]],
								['J', [['N'], ['O']]],
							],
						],
						['G', [['K'], ['L']]],
					],
				],
			],
		]

		it('#hard test 1', () => {
			const expected = [
				'F',
				[
					[
						'C',
						[
							['A', [['B', [['D', [['H']]], ['E']]]]],
							['G', [['K'], ['L']]],
						],
					],
					['I', [['M']]],
					['J', [['N'], ['O']]],
				],
			]

			const actual = transform(tree, 'F')
			expect(sortTree(actual)).toEqual(expected)
		})

		it('#hard test 2', () => {
			const expected = [
				'I',
				[
					[
						'F',
						[
							[
								'C',
								[
									['A', [['B', [['D', [['H']]], ['E']]]]],
									['G', [['K'], ['L']]],
								],
							],
							['J', [['N'], ['O']]],
						],
					],
					['M'],
				],
			]

			
			const actual = transform(tree, 'I')
			expect(sortTree(actual)).toEqual(expected)
		})
	})
})
