import { ProductDAO } from "../daos/product.dao.js"

class ProductRepository {
  constructor() {
    this.dao = new ProductDAO()
  }

  find(query = {}) {
    return this.dao.find(query)
  }

  findById(id) {
    return this.dao.findById(id)
  }

  create(data) {
    return this.dao.create(data)
  }

  update(id, data) {
    return this.dao.update(id, data)
  }

  delete(id) {
    return this.dao.delete(id)
  }
}

export const productRepository = new ProductRepository()
