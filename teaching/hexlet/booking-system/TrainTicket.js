import Ticket from './Ticket'
export default class TrainTicket extends Ticket {
	constructor(number, price, date, trainNumber, seatNumber, wagonType) {
		super(number, price, date)
		this.trainNumber = trainNumber
		this.seatNumber = seatNumber
		this.wagonType = wagonType
	}

	getInfo() {
		return (
			super.getInfo() +
			`, Поезд: ${this.trainNumber}, Место: ${this.seatNumber}, Вагон: ${this.wagonType}`
		)
	}
}
