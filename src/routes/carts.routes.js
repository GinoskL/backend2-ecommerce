import { Router } from "express"
import {
  getCart,
  addProductToCart,
  purchaseCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
} from "../controllers/carts.controller.js"
import { jwtAuth, authorization } from "../middlewares/auth.middleware.js"

const router = Router()

// Todas las rutas requieren autenticación de usuario
router.get("/", jwtAuth, authorization("user"), getCart)
router.post("/product/:pid", jwtAuth, authorization("user"), addProductToCart)
router.put("/product/:pid", jwtAuth, authorization("user"), updateProductQuantity)
router.delete("/product/:pid", jwtAuth, authorization("user"), removeProductFromCart)
router.delete("/", jwtAuth, authorization("user"), clearCart)
router.post("/purchase", jwtAuth, authorization("user"), purchaseCart)

export default router
