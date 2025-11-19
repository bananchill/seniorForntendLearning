import Ticket from './Ticket'

export default class AirplaneTicket extends Ticket {
	constructor(number, price, date, airline, seatNumber, serviceClass) {
		super(number, price, date)
		this.airline = airline
		this.seatNumber = seatNumber
		this.serviceClass = serviceClass
	}

	getInfo() {
		return (
			super.getInfo() +
			`, Авиакомпания: ${this.airline}, Место: ${this.seatNumber}, Класс: ${this.serviceClass}`
		)
	}
}
