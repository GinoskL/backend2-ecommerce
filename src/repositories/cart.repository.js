import { CartDAO } from "../daos/cart.dao.js"

class CartRepository {
  constructor() {
    this.dao = new CartDAO()
  }

  create() {
    return this.dao.create()
  }

  findById(id) {
    return this.dao.findById(id)
  }

  update(id, data) {
    return this.dao.update(id, data)
  }
}

export const cartRepository = new CartRepository()
