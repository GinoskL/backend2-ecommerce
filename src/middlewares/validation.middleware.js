import { validationResult } from "express-validator"
import { setupLogger } from "../config/logger.js"

const logger = setupLogger()

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    logger.warn("❌ Errores de validación:", {
      errors: errors.array(),
      body: req.body,
      ip: req.ip,
      url: req.originalUrl,
    })

    return res.status(400).json({
      status: "error",
      message: "Datos de entrada inválidos",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      })),
    })
  }

  next()
}
