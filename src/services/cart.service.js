import mongoose from "mongoose"
import { cartRepository } from "../repositories/cart.repository.js"
import { productService } from "./product.service.js"
import { ticketService } from "./ticket.service.js"
import { sendPurchaseEmail } from "../utils/mailer.js"

class CartService {
  async createCart() {
    return await cartRepository.create()
  }

  async getCart(cid) {
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      const err = new Error("ID de carrito inválido")
      err.status = 400
      throw err
    }

    const cart = await cartRepository.findById(cid)
    if (!cart) {
      const err = new Error("Carrito no encontrado")
      err.status = 404
      throw err
    }

    return cart
  }

  async addProduct({ cid, pid }) {
    const cart = await this.getCart(cid)
    const product = await productService.getById(pid)

    if (product.stock <= 0) {
      const err = new Error("Sin stock disponible")
      err.status = 400
      throw err
    }

    const idx = cart.products.findIndex((p) => p.product._id.toString() === pid)
    if (idx >= 0) {
      cart.products[idx].quantity += 1
    } else {
      cart.products.push({ product: product._id, quantity: 1 })
    }

    const updated = await cartRepository.update(cart._id, { products: cart.products })
    return updated
  }

  async purchase({ cid, purchaserEmail }) {
    const cart = await this.getCart(cid)

    let amount = 0
    const remaining = []

    for (const item of cart.products) {
      const product = await productService.getById(item.product._id.toString())
      if (product.stock >= item.quantity) {
        const lineAmount = product.price * item.quantity
        amount += lineAmount
        await productService.update(product._id.toString(), {
          stock: product.stock - item.quantity,
        })
      } else {
        remaining.push({ product: product._id, quantity: item.quantity })
      }
    }

    await cartRepository.update(cart._id, { products: remaining })

    const result = {
      notPurchased: remaining.map((r) => ({
        product: r.product.toString(),
        quantity: r.quantity,
      })),
    }

    if (amount > 0) {
      const ticket = await ticketService.createUniqueTicket({
        amount,
        purchaser: purchaserEmail,
      })
      result.ticket = ticket

      try {
        await sendPurchaseEmail({ to: purchaserEmail, ticket })
      } catch (err) {
        console.error("Error enviando email de compra:", err.message)
      }
    }

    return result
  }
}

export const cartService = new CartService()
