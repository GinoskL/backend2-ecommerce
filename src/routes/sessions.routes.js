import { Router } from "express"
import { register, login, current } from "../controllers/sessions.controller.js"
import { jwtAuth } from "../middlewares/auth.middleware.js"
import { handleValidationErrors } from "../middlewares/validation.middleware.js"
import { registerValidation, loginValidation } from "../validators/auth.validators.js"

const router = Router()

router.post("/register", registerValidation, handleValidationErrors, register)
router.post("/login", loginValidation, handleValidationErrors, login)
router.get("/current", jwtAuth, current)

export default router
