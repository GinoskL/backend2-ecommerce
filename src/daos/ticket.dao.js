import { TicketModel } from "../models/ticket.model.js"

export class TicketDAO {
  async create(data) {
    return await TicketModel.create(data)
  }

  async findByCode(code) {
    return await TicketModel.findOne({ code })
  }

  async findById(id) {
    return await TicketModel.findById(id).lean()
  }

  async findByPurchaser(email, options = {}) {
    const { skip = 0, limit = 10, sort = { purchase_datetime: -1 } } = options
    return await TicketModel.find({ purchaser: email }).sort(sort).skip(skip).limit(limit).lean()
  }

  async find(query = {}, options = {}) {
    const { skip = 0, limit = 10, sort = { purchase_datetime: -1 } } = options
    return await TicketModel.find(query).sort(sort).skip(skip).limit(limit).lean()
  }

  async count(query = {}) {
    return await TicketModel.countDocuments(query)
  }

  async updateStatus(id, status) {
    return await TicketModel.findByIdAndUpdate(id, { status }, { new: true }).lean()
  }
}
