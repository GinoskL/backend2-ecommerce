import { Router } from "express"
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js"
import { jwtAuth, authorization } from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/", listProducts)
router.get("/:pid", getProduct)
router.post("/", jwtAuth, authorization("admin"), createProduct)
router.put("/:pid", jwtAuth, authorization("admin"), updateProduct)
router.delete("/:pid", jwtAuth, authorization("admin"), deleteProduct)

export default router
