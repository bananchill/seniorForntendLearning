export default class Ticket {
	constructor(number, price, date) {
		this.number = number
		this.price = price
		this.date = date
	}

	getInfo() {
		return `Номер билета: ${this.number}, Цена: ${this.price}, Дата: ${this.date}`
	}
}
