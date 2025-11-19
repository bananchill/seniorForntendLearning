import AirplaneTicket from './AirplaneTicket.js'
import TrainTicket from './TrainTicket.js'
import CinemaTicket from './CinemaTicket.js'
import BookingSystem from './BookingSystem.js'

describe('BookingSystem', () => {
	let bookingSystem

	beforeEach(() => {
		bookingSystem = new BookingSystem()
	})

	it('should book a ticket', () => {
		const airplaneTicket = new AirplaneTicket(
			1,
			100,
			'2024-01-01',
			'Аэрофлот',
			'1A',
			'Бизнес'
		)
		bookingSystem.bookTicket(airplaneTicket)
		expect(bookingSystem.getTicketInfo(1)).toEqual(airplaneTicket)

		const trainTicket = new TrainTicket(
			2,
			50,
			'2024-02-02',
			'001',
			'10',
			'Плацкарт'
		)
		bookingSystem.bookTicket(trainTicket)
		expect(bookingSystem.getTicketInfo(2)).toEqual(trainTicket)

		const cinemaTicket = new CinemaTicket(
			3,
			200,
			'2024-03-03',
			'Матрица',
			'5B',
			3
		)
		bookingSystem.bookTicket(cinemaTicket)
		expect(bookingSystem.getTicketInfo(3)).toEqual(cinemaTicket)
	})

	it('should cancel a booking', () => {
		const trainTicket = new TrainTicket(
			2,
			50,
			'2024-02-02',
			'001',
			'10',
			'Плацкарт'
		)
		bookingSystem.bookTicket(trainTicket)
		expect(bookingSystem.cancelBooking(2)).toBe(true)
		expect(bookingSystem.getTicketInfo(2)).toBeFalsy()

		const airlineTicket = new AirplaneTicket(
			3,
			150,
			'2024-03-07',
			'Победа',
			'5B',
			'Эконом'
		)
		bookingSystem.bookTicket(airlineTicket)
		expect(bookingSystem.cancelBooking(3)).toBe(true)
		expect(bookingSystem.getTicketInfo(3)).toBeFalsy()

		const cinemaTicket = new CinemaTicket(
			3,
			200,
			'2024-03-09',
			'Дюна',
			'10B',
			2
		)
		bookingSystem.bookTicket(cinemaTicket)
		expect(bookingSystem.cancelBooking(3)).toBe(true)
		expect(bookingSystem.getTicketInfo(3)).toBeFalsy()
	})

	it('should return false when canceling a non-existing booking', () => {
		expect(bookingSystem.cancelBooking(999)).toBe(false)
	})

	it('should get ticket info', () => {
		const airlineTicket = new AirplaneTicket(
			3,
			150,
			'2024-03-03',
			'Победа',
			'5B',
			'Эконом'
		)
		bookingSystem.bookTicket(airlineTicket)
		expect(bookingSystem.getTicketInfo(3)).toEqual(airlineTicket)
		expect(bookingSystem.getTicketInfo(3).getInfo()).toEqual(
			'Номер билета: 3, Цена: 150, Дата: 2024-03-03, Авиакомпания: Победа, Место: 5B, Класс: Эконом'
		)

		const cinemaTicket = new CinemaTicket(
			1,
			200,
			'2023-03-09',
			'Барби',
			'7A',
			1
		)
		bookingSystem.bookTicket(cinemaTicket)
		expect(bookingSystem.getTicketInfo(1)).toEqual(cinemaTicket)
		expect(bookingSystem.getTicketInfo(1).getInfo()).toEqual(
			'Номер билета: 1, Цена: 200, Дата: 2023-03-09, Фильм: Барби, Место: 7A, Зал: 1'
		)

		const trainTicket = new TrainTicket(
			2,
			50,
			'2023-02-02',
			'001',
			'10',
			'Плацкарт'
		)
		bookingSystem.bookTicket(trainTicket)
		expect(bookingSystem.getTicketInfo(2)).toEqual(trainTicket)
		expect(bookingSystem.getTicketInfo(2).getInfo()).toEqual(
			'Номер билета: 2, Цена: 50, Дата: 2023-02-02, Поезд: 001, Место: 10, Вагон: Плацкарт'
		)
	})

	it('should return null when getting info for a non-existing ticket', () => {
		expect(bookingSystem.getTicketInfo(9999)).toBeNull()
	})
})
