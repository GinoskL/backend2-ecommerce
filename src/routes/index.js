import { Router } from "express"
import sessionsRouter from "./sessions.routes.js"
import productsRouter from "./products.routes.js"
import cartsRouter from "./carts.routes.js"

const router = Router()

// Información de la API
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Backend E-commerce API",
    version: "3.0.0",
    endpoints: {
      auth: "/api/sessions",
      products: "/api/products",
      carts: "/api/carts",
    },
    documentation: "Ver README.md para documentación completa",
    health: "/health",
  })
})

// Rutas principales
router.use("/sessions", sessionsRouter)
router.use("/products", productsRouter)
router.use("/carts", cartsRouter)

export default router
