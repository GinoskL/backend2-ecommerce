import { CartModel } from "../models/cart.model.js"

export class CartDAO {
  async create() {
    return await CartModel.create({ products: [] })
  }

  async findById(id) {
    return await CartModel.findById(id).populate("products.product")
  }

  async update(id, data) {
    return await CartModel.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id) {
    return await CartModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).lean()
  }

  async addProduct(cartId, productId, quantity = 1) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      {
        $push: {
          products: {
            product: productId,
            quantity,
            addedAt: new Date(),
          },
        },
      },
      { new: true },
    ).lean()
  }

  async updateProductQuantity(cartId, productId, quantity) {
    return await CartModel.findOneAndUpdate(
      { _id: cartId, "products.product": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true },
    ).lean()
  }

  async removeProduct(cartId, productId) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true },
    ).lean()
  }
}
