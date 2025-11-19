import Ticket from './Ticket'
export default class CinemaTicket extends Ticket {
	constructor(number, price, date, movieTitle, seatNumber, hallNumber) {
		super(number, price, date)
		this.movieTitle = movieTitle
		this.seatNumber = seatNumber
		this.hallNumber = hallNumber
	}

	getInfo() {
		return (
			super.getInfo() +
			`, Фильм: ${this.movieTitle}, Место: ${this.seatNumber}, Зал: ${this.hallNumber}`
		)
	}
}
