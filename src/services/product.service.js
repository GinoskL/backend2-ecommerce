import mongoose from "mongoose"
import { productRepository } from "../repositories/product.repository.js"

class ProductService {
  async list() {
    return await productRepository.find()
  }

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("ID inválido")
      err.status = 400
      throw err
    }

    const product = await productRepository.findById(id)
    if (!product) {
      const err = new Error("Producto no encontrado")
      err.status = 404
      throw err
    }

    return product
  }

  async create(data) {
    const required = ["title", "description", "price", "stock", "category"]
    for (const field of required) {
      if (data[field] === undefined || data[field] === null) {
        const err = new Error(`Campo requerido: ${field}`)
        err.status = 400
        throw err
      }
    }

    data.thumbnails = Array.isArray(data.thumbnails) ? data.thumbnails : []
    return await productRepository.create(data)
  }

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("ID inválido")
      err.status = 400
      throw err
    }

    const updated = await productRepository.update(id, data)
    if (!updated) {
      const err = new Error("Producto no encontrado")
      err.status = 404
      throw err
    }

    return updated
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("ID inválido")
      err.status = 400
      throw err
    }

    const deleted = await productRepository.delete(id)
    if (!deleted) {
      const err = new Error("Producto no encontrado")
      err.status = 404
      throw err
    }

    return deleted
  }
}

export const productService = new ProductService()
