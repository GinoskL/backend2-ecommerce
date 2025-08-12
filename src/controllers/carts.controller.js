import { cartService } from "../services/cart.service.js"

export const createCart = async (req, res, next) => {
  try {
    const cart = await cartService.createCart()
    res.status(201).json({ status: "success", payload: cart })
  } catch (err) {
    next(err)
  }
}

export const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params
    if (req.user.cart?.toString() !== cid) {
      return res.status(403).json({
        status: "error",
        message: "Solo puedes modificar tu propio carrito",
      })
    }
    const updated = await cartService.addProduct({ cid, pid })
    res.json({ status: "success", payload: updated })
  } catch (err) {
    next(err)
  }
}

export const purchaseCart = async (req, res, next) => {
  try {
    const { cid } = req.params
    if (req.user.cart?.toString() !== cid) {
      return res.status(403).json({
        status: "error",
        message: "Solo puedes comprar tu propio carrito",
      })
    }
    const result = await cartService.purchase({ cid, purchaserEmail: req.user.email })
    res.json({ status: "success", payload: result })
  } catch (err) {
    next(err)
  }
}
