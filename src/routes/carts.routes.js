import { Router } from "express"
import { createCart, addProductToCart, purchaseCart } from "../controllers/carts.controller.js"
import { jwtAuth, authorization } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/", createCart)
router.post("/:cid/product/:pid", jwtAuth, authorization("user"), addProductToCart)
router.post("/:cid/purchase", jwtAuth, authorization("user"), purchaseCart)

export default router
