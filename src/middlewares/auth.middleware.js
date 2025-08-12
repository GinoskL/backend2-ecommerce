import passport from "passport"
import { setupLogger } from "../config/logger.js"

const logger = setupLogger()

export const jwtAuth = passport.authenticate("jwt", { session: false })

export function authorization(role) {
  return (req, res, next) => {
    if (!req.user) {
      logger.warn("🚫 Intento de acceso sin autenticación", {
        ip: req.ip,
        url: req.originalUrl,
      })
      return res.status(401).json({
        status: "error",
        message: "Token de autenticación requerido",
      })
    }

    if (req.user.role !== role) {
      logger.warn(`🚫 Acceso denegado: ${req.user.email} (${req.user.role}) -> ${role}`, {
        user: req.user.email,
        userRole: req.user.role,
        requiredRole: role,
        url: req.originalUrl,
      })
      return res.status(403).json({
        status: "error",
        message: `Acceso denegado. Se requiere rol: ${role}`,
      })
    }

    next()
  }
}
