export default class BookingSystem {
	#tickets = []
	bookTicket(ticket) {
		this.#tickets.push(ticket)
	}
	cancelBooking(ticketNumber) {
		const indexTicket = this.#tickets.findIndex(
			el => el.number === ticketNumber
		)

		if (indexTicket === -1) {
			return false
		}

		this.#tickets = this.#tickets.filter((_, index) => index !== indexTicket)

		return true
	}

	getTicketInfo(ticketNumber) {
		return this.#tickets.find(el => el.number === ticketNumber) || null
	}
}
