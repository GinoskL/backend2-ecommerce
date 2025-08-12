import { setupLogger } from "../config/logger.js"

const logger = setupLogger()

export function notFound(req, res, next) {
  logger.warn(`❌ Recurso no encontrado: ${req.method} ${req.originalUrl}`)

  res.status(404).json({
    status: "error",
    message: "Endpoint no encontrado",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  })
}

export function errorHandler(err, req, res, next) {
  logger.error("❌ Error en aplicación:", {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  })

  if (res.headersSent) {
    return next(err)
  }

  // Errores específicos de MongoDB
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Error de validación",
      details: Object.values(err.errors).map((e) => e.message),
    })
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: "ID inválido",
    })
  }

  if (err.code === 11000) {
    return res.status(409).json({
      status: "error",
      message: "Recurso duplicado",
    })
  }

  // Error genérico
  const status = err.status || 500
  res.status(status).json({
    status: "error",
    message: err.message || "Error interno del servidor",
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}
