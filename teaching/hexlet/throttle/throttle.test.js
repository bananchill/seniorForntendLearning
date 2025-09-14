// teaching/hexlet/throttle/throttle.test.js
// @ts-check

import throttle from './throttle.js'
import {
	describe,
	beforeEach,
	afterEach,
	test,
	expect,
	jest,
} from '@jest/globals'

describe('throttle(f, 1000)', () => {
	let f1000
	let log

	function f(a) {
		log += a
	}

	beforeEach(() => {
		jest.useFakeTimers()
		log = ''
		f1000 = throttle(f, 1000)
	})

	afterEach(() => {
		jest.useRealTimers()
	})

	test('1-й вызов происходит немедленно', () => {
		debugger

		f1000(1)
		expect(log).toBe('1')
	})

	test('далее вызовы игнорируются до истечения 1000 мс; выполняется trailing с последним аргументом', () => {
		// стартовое состояние из предыдущего теста не наследуется — beforeEach всё сбросил
		debugger
		f1000(1) // немедленно
		f1000(2) // в окно — игнорируется, но должен "запомниться" как последний
		f1000(3) // в окно — перезаписывает "последний"
		expect(log).toBe('1')

		// проходит 1000 мс с момента первого вызова в окне — должен выполниться trailing(3)
		jest.advanceTimersByTime(1000)
		expect(log).toBe('13')
	})

	test('3-й вызов ждёт 1000 мс от 2-го окна; выполняется trailing с последним (6)', () => {
		// Подтверждаем семантику «leading + trailing»
		f1000(1) // немедленно -> log = '1'
		expect(log).toBe('1')

		// эмулируем серию быстрых вызовов в пределах окна
		jest.advanceTimersByTime(100) // t=100
		f1000(4) // переписывает "последний"
		jest.advanceTimersByTime(100) // t=200
		f1000(5) // переписывает "последний"
		jest.advanceTimersByTime(700) // t=900
		f1000(6) // переписывает "последний" (всё ещё в окне)

		// теперь доводим до 1000 мс в сумме — должен сработать trailing(6)
		jest.advanceTimersByTime(100) // t=1000
		expect(log).toBe('16')
	})
})
