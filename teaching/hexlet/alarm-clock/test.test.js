// @ts-check

import AlarmClock from './AlarmClock.js'

describe('AlarmClock', () => {
	it('should have default values', () => {
		const clock = new AlarmClock()
		expect(clock.minutes()).toBe(0)
		expect(clock.hours()).toBe(12)
		expect(clock.alarmHours()).toBe(6)
		expect(clock.alarmMinutes()).toBe(0)
	})

	it('should change state when click to mode', () => {
		const clock = new AlarmClock()
		expect(clock.isAlarmOn()).toBe(false)
		expect(clock.getCurrentMode()).toBe('clock')

		clock.clickMode()
		clock.tick()
		expect(clock.isAlarmOn()).toBe(false)
		expect(clock.getCurrentMode()).toBe('alarm')

		clock.clickMode()
		clock.tick()
		expect(clock.isAlarmOn()).toBe(false)
		expect(clock.getCurrentMode()).toBe('clock')

		clock.longClickMode()
		clock.tick()
		expect(clock.isAlarmOn()).toBe(true)
		expect(clock.getCurrentMode()).toBe('clock')

		clock.clickMode()
		clock.tick()
		expect(clock.isAlarmOn()).toBe(true)
		expect(clock.getCurrentMode()).toBe('alarm')

		clock.clickMode()
		clock.tick()
		expect(clock.isAlarmOn()).toBe(true)
		expect(clock.getCurrentMode()).toBe('clock')

		clock.longClickMode()
		expect(clock.isAlarmOn()).toBe(false)
		expect(clock.getCurrentMode()).toBe('clock')
	})

	it('should change hours and minutes', () => {
		const clock = new AlarmClock()
		clock.clickH()
		expect(clock.minutes()).toBe(0)
		expect(clock.hours()).toBe(13)
		expect(clock.alarmHours()).toBe(6)
		expect(clock.alarmMinutes()).toBe(0)

		clock.clickM()
		expect(clock.minutes()).toBe(1)
		expect(clock.hours()).toBe(13)
		expect(clock.alarmHours()).toBe(6)
		expect(clock.alarmMinutes()).toBe(0)

		clock.clickMode()

		clock.clickH()
		expect(clock.minutes()).toBe(1)
		expect(clock.hours()).toBe(13)
		expect(clock.alarmHours()).toBe(7)
		expect(clock.alarmMinutes()).toBe(0)

		clock.clickM()
		expect(clock.minutes()).toBe(1)
		expect(clock.hours()).toBe(13)
		expect(clock.alarmHours()).toBe(7)
		expect(clock.alarmMinutes()).toBe(1)

		for (let i = 0; i < 60; i += 1) {
			clock.clickM()
		}
		expect(clock.alarmMinutes()).toBe(1)
		expect(clock.alarmHours()).toBe(7)

		for (let i = 0; i < 17; i += 1) {
			clock.clickH()
		}
		expect(clock.alarmHours()).toBe(0)
	})

	it('should not start bell if alarm off', () => {
		const clock = new AlarmClock()

		for (let i = 0; i < 18 * 60; i += 1) {
			clock.tick()
		}

		expect(clock.isAlarmTime()).toBe(true)
		expect(clock.getCurrentMode()).toBe('clock')
		clock.clickM()
		clock.clickH()

		clock.tick()
		expect(clock.getCurrentMode()).toBe('clock')
	})

	it('should start bell if alarm on 1', () => {
		const clock = new AlarmClock()
		clock.longClickMode()

		for (let i = 0; i < 18 * 60; i += 1) {
			clock.tick()
		}

		expect(clock.isAlarmTime()).toBe(true)
		expect(clock.getCurrentMode()).toBe('bell')
		clock.clickM()
		clock.clickH()

		clock.tick()
		expect(clock.getCurrentMode()).toBe('clock')
	})

	it('should start bell if alarm on 2', () => {
		const clock = new AlarmClock()
		clock.longClickMode()

		for (let i = 0; i < 18 * 60; i += 1) {
			clock.tick()
		}
		expect(clock.isAlarmTime()).toBe(true)
		expect(clock.getCurrentMode()).toBe('bell')

		clock.clickMode()
		expect(clock.getCurrentMode()).toBe('clock')
	})

	it('should start bell if state is Alarm', () => {
		const clock = new AlarmClock()
		clock.longClickMode()
		clock.clickMode()
		expect(clock.getCurrentMode()).toBe('alarm')

		for (let i = 0; i < 18 * 60; i += 1) {
			clock.tick()
		}
		expect(clock.isAlarmOn()).toBe(true)
		expect(clock.isAlarmTime()).toBe(true)
		expect(clock.getCurrentMode()).toBe('bell')

		clock.clickMode()
		expect(clock.getCurrentMode()).toBe('clock')
	})

	it('should increment minutes after Alarm', () => {
		const clock = new AlarmClock()
		clock.longClickMode()
		for (let i = 0; i < 18 * 60; i += 1) {
			clock.tick()
		}
		expect(clock.isAlarmTime()).toBe(true)
		expect(clock.getCurrentMode()).toBe('bell')
		clock.tick()
		expect(clock.getCurrentMode()).toBe('clock')
		expect(clock.minutes()).toBe(1)
	})
})
