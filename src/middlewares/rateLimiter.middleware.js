import { setupLogger } from "../config/logger.js"

const logger = setupLogger()
const requests = new Map()

export function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || "unknown"
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutos
  const maxRequests = 100 // máximo 100 requests por ventana

  // Limpiar requests antiguos periódicamente
  if (Math.random() < 0.01) {
    // 1% de probabilidad
    cleanOldRequests(now, windowMs)
  }

  if (!requests.has(ip)) {
    requests.set(ip, { count: 1, resetTime: now + windowMs })
    return next()
  }

  const requestData = requests.get(ip)

  // Si la ventana de tiempo expiró, resetear
  if (now > requestData.resetTime) {
    requests.set(ip, { count: 1, resetTime: now + windowMs })
    return next()
  }

  // Si excede el límite
  if (requestData.count >= maxRequests) {
    logger.warn(`🚫 Rate limit excedido para IP: ${ip}`)
    return res.status(429).json({
      status: "error",
      message: "Demasiadas peticiones. Intenta de nuevo en 15 minutos.",
      retryAfter: Math.ceil((requestData.resetTime - now) / 1000),
    })
  }

  // Incrementar contador
  requestData.count++
  next()
}

function cleanOldRequests(now, windowMs) {
  for (const [ip, data] of requests.entries()) {
    if (now > data.resetTime) {
      requests.delete(ip)
    }
  }
}
