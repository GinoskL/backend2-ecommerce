import { cartService } from "../services/cart.service.js"

export const getCart = async (req, res, next) => {
  try {
    // El usuario solo puede ver su propio carrito
    const cart = await cartService.getCart(req.user.cart)
    res.json({ status: "success", payload: cart })
  } catch (err) {
    next(err)
  }
}

export const addProductToCart = async (req, res, next) => {
  try {
    const { pid } = req.params
    // Usar el carrito del usuario autenticado
    const cid = req.user.cart

    const updated = await cartService.addProduct({ cid, pid })
    res.json({ status: "success", payload: updated })
  } catch (err) {
    next(err)
  }
}

export const purchaseCart = async (req, res, next) => {
  try {
    // Usar el carrito del usuario autenticado
    const cid = req.user.cart

    const result = await cartService.purchase({ cid, purchaserEmail: req.user.email })
    res.json({ status: "success", payload: result })
  } catch (err) {
    next(err)
  }
}

export const removeProductFromCart = async (req, res, next) => {
  try {
    const { pid } = req.params
    const cid = req.user.cart

    const updated = await cartService.removeProduct({ cid, pid })
    res.json({ status: "success", payload: updated })
  } catch (err) {
    next(err)
  }
}

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { pid } = req.params
    const { quantity } = req.body
    const cid = req.user.cart

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        status: "error",
        message: "La cantidad debe ser mayor a 0",
      })
    }

    const updated = await cartService.updateProductQuantity({ cid, pid, quantity })
    res.json({ status: "success", payload: updated })
  } catch (err) {
    next(err)
  }
}

export const clearCart = async (req, res, next) => {
  try {
    const cid = req.user.cart
    const updated = await cartService.clearCart(cid)
    res.json({ status: "success", payload: updated })
  } catch (err) {
    next(err)
  }
}
