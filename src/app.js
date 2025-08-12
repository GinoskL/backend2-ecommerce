import "dotenv/config"
import express from "express"
import cors from "cors"
import passport from "passport"

// Configuraciones
import { connectDB } from "./config/db.js"
import { setupLogger, requestLogger } from "./config/logger.js"
import "./config/passport.config.js"

// Rutas y middlewares
import apiRouter from "./routes/index.js"
import { errorHandler, notFound } from "./middlewares/error.middleware.js"
import { rateLimiter } from "./middlewares/rateLimiter.middleware.js"

const app = express()
const logger = setupLogger()

// Middlewares básicos
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(requestLogger)
app.use(rateLimiter)
app.use(passport.initialize())

// Conexión a base de datos
await connectDB()

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend API funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: "3.0.0",
    environment: process.env.NODE_ENV || "development",
  })
})

// Rutas principales
app.use("/api", apiRouter)

// Manejo de errores
app.use(notFound)
app.use(errorHandler)

// Iniciar servidor
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  logger.info(`🚀 Backend API iniciado en puerto ${PORT}`)
  logger.info(`📍 URL: http://localhost:${PORT}`)
  logger.info(`🌍 Entorno: ${process.env.NODE_ENV || "development"}`)
  logger.info(`📊 Health check: http://localhost:${PORT}/health`)
})

// Manejo de errores no capturados
process.on("uncaughtException", (err) => {
  logger.error("❌ Uncaught Exception:", err)
  process.exit(1)
})

process.on("unhandledRejection", (err) => {
  logger.error("❌ Unhandled Rejection:", err)
  process.exit(1)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("🛑 SIGTERM recibido, cerrando servidor...")
  process.exit(0)
})

process.on("SIGINT", () => {
  logger.info("🛑 SIGINT recibido, cerrando servidor...")
  process.exit(0)
})
