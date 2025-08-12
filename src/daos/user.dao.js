import { UserModel } from "../models/user.model.js"

export class UserDAO {
  async create(data) {
    return await UserModel.create(data)
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email, isActive: true }).lean()
  }

  async findById(id) {
    return await UserModel.findById(id).lean()
  }

  async update(id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).lean()
  }

  async delete(id) {
    // Soft delete
    return await UserModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).lean()
  }

  async find(query = {}, options = {}) {
    const { skip = 0, limit = 10, sort = { createdAt: -1 } } = options
    return await UserModel.find({ ...query, isActive: true })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
  }

  async count(query = {}) {
    return await UserModel.countDocuments({ ...query, isActive: true })
  }
}
