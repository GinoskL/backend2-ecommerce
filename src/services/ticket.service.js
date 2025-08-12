import { v4 as uuidv4 } from "uuid"
import { ticketRepository } from "../repositories/ticket.repository.js"
import { setupLogger } from "../config/logger.js"

const logger = setupLogger()

class TicketService {
  async createUniqueTicket({ amount, purchaser, items = [] }) {
    // Generar código único
    let code = uuidv4()
    let exists = await ticketRepository.findByCode(code)

    while (exists) {
      code = uuidv4()
      exists = await ticketRepository.findByCode(code)
    }

    const ticketData = {
      code,
      amount: Math.round(amount * 100) / 100, // Redondear a 2 decimales
      purchaser: purchaser.toLowerCase().trim(),
      items,
      status: "completed",
    }

    const ticket = await ticketRepository.create(ticketData)
    logger.info(`Ticket creado: ${code} por $${amount} para ${purchaser}`)

    return ticket
  }

  generateTicketCode() {
    // Generar código más legible: TICK-YYYYMMDD-XXXX
    const date = new Date()
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "")
    const randomStr = uuidv4().slice(0, 8).toUpperCase()
    return `TICK-${dateStr}-${randomStr}`
  }

  async getTicketByCode(code) {
    const ticket = await ticketRepository.findByCode(code.toUpperCase())
    if (!ticket) {
      const err = new Error("Ticket no encontrado")
      err.status = 404
      throw err
    }
    return ticket
  }

  async getTicketsByPurchaser(email, options = {}) {
    return await ticketRepository.findByPurchaser(email.toLowerCase().trim(), options)
  }

  async updateTicketStatus(ticketId, status) {
    const validStatuses = ["pending", "completed", "cancelled"]
    if (!validStatuses.includes(status)) {
      const err = new Error("Estado de ticket inválido")
      err.status = 400
      throw err
    }

    const updated = await ticketRepository.updateStatus(ticketId, status)
    if (!updated) {
      const err = new Error("Ticket no encontrado")
      err.status = 404
      throw err
    }

    logger.info(`Estado de ticket ${updated.code} actualizado a: ${status}`)
    return updated
  }
}

export const ticketService = new TicketService()
