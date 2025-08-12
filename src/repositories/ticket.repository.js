import { TicketDAO } from "../daos/ticket.dao.js"

class TicketRepository {
  constructor() {
    this.dao = new TicketDAO()
  }

  create(data) {
    return this.dao.create(data)
  }

  findByCode(code) {
    return this.dao.findByCode(code)
  }
}

export const ticketRepository = new TicketRepository()
