import { productService } from "../services/product.service.js"

export const listProducts = async (req, res, next) => {
  try {
    const products = await productService.list()
    res.json({ status: "success", payload: products })
  } catch (err) {
    next(err)
  }
}

export const getProduct = async (req, res, next) => {
  try {
    const product = await productService.getById(req.params.pid)
    res.json({ status: "success", payload: product })
  } catch (err) {
    next(err)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const created = await productService.create(req.body)
    res.status(201).json({ status: "success", payload: created })
  } catch (err) {
    next(err)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await productService.update(req.params.pid, req.body)
    res.json({ status: "success", payload: updated })
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await productService.delete(req.params.pid)
    res.json({ status: "success", payload: deleted })
  } catch (err) {
    next(err)
  }
}
