import winston from "winston"
import morgan from "morgan"
import fs from "fs"
import path from "path"

// Crear directorio de logs si no existe
const logsDir = "logs"
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

export function setupLogger() {
  const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    ),
    defaultMeta: {
      service: "ecommerce-backend",
      version: "3.0.0",
    },
    transports: [
      // Archivo para errores
      new winston.transports.File({
        filename: path.join(logsDir, "error.log"),
        level: "error",
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      // Archivo para todos los logs
      new winston.transports.File({
        filename: path.join(logsDir, "combined.log"),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    ],
  })

  // En desarrollo, también mostrar en consola
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      }),
    )
  }

  return logger
}

// Morgan logger para requests HTTP
export const requestLogger = morgan("combined", {
  stream: {
    write: (message) => {
      const logger = setupLogger()
      logger.info(message.trim())
    },
  },
})
