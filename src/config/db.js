import mongoose from "mongoose"
import { setupLogger } from "./logger.js"

const logger = setupLogger()

export async function connectDB() {
  const uri = process.env.MONGO_URI

  if (!uri) {
    logger.error("❌ MONGO_URI no está definida en las variables de entorno")
    process.exit(1)
  }

  try {
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    await mongoose.connect(uri, options)
    logger.info("✅ MongoDB conectado exitosamente")

    // Log de la base de datos conectada
    const dbName = mongoose.connection.db.databaseName
    logger.info(`📊 Base de datos: ${dbName}`)
  } catch (err) {
    logger.error("❌ Error conectando a MongoDB:", err)
console.error("ERROR COMPLETO:", err)
    process.exit(1)
  }

  // Event listeners para la conexión
  mongoose.connection.on("error", (err) => {
    logger.error("❌ Error de conexión MongoDB:", err)
  })

  mongoose.connection.on("disconnected", () => {
    logger.warn("⚠️ MongoDB desconectado")
  })

  mongoose.connection.on("reconnected", () => {
    logger.info("🔄 MongoDB reconectado")
  })
}
