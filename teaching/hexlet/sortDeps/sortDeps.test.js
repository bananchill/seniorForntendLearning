// @ts-check

import sortDeps from './sortDeps.js'

test('should works', () => {
	const deps1 = {
		mongo: [],
		tzinfo: ['thread_safe'],
		uglifier: ['execjs'],
		execjs: ['thread_safe', 'json'],
		redis: [],
	}
	const expected1 = [
		'mongo',
		'thread_safe',
		'tzinfo',
		'json',
		'execjs',
		'uglifier',
		'redis',
	]
	expect(sortDeps(deps1)).toEqual(expected1)

	const deps2 = {
		wrong: ['predicated', 'sexp_processor'],
		xpath: ['nokogiri'],
		predicated: ['htmlentities'],
		sexp_processor: [],
		nokogiri: ['wrong'],
		virtus: [],
	}
	const expected2 = [
		'htmlentities',
		'predicated',
		'sexp_processor',
		'wrong',
		'nokogiri',
		'xpath',
		'virtus',
	]
	expect(sortDeps(deps2)).toEqual(expected2)

	const deps3 = {
		wrong: ['predicated', 'sexp_processor'],
		xpath: ['nokogiri'],
		predicated: ['htmlentities'],
		sexp_processor: [],
		nokogiri: ['wrong', 'libxml2'],
		libxml2: ['libxslt'],
		virtus: [],
	}
	const expected3 = [
		'htmlentities',
		'predicated',
		'sexp_processor',
		'wrong',
		'libxslt',
		'libxml2',
		'nokogiri',
		'xpath',
		'virtus',
	]
	expect(sortDeps(deps3)).toEqual(expected3)
})
