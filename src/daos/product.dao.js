import { ProductModel } from "../models/product.model.js"

export class ProductDAO {
  async find(query = {}) {
    return await ProductModel.find(query)
  }

  async findById(id) {
    return await ProductModel.findById(id)
  }

  async create(data) {
    return await ProductModel.create(data)
  }

  async update(id, data) {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id)
  }
}
