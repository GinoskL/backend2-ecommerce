import "dotenv/config"
import { connectDB } from "../config/db.js"
import { userService } from "../services/user.service.js"
import { productService } from "../services/product.service.js"
import { userRepository } from "../repositories/user.repository.js"
import { setupLogger } from "../config/logger.js"

const logger = setupLogger()

const sampleProducts = [
  {
    title: "Laptop Gaming",
    description: "Laptop para gaming de alta gama con RTX 4070",
    price: 1299.99,
    stock: 15,
    category: "electronics",
    thumbnails: ["https://example.com/laptop.jpg"],
  },
  {
    title: "iPhone 15 Pro",
    description: "Último modelo de iPhone con chip A17 Pro",
    price: 999.99,
    stock: 25,
    category: "electronics",
    thumbnails: ["https://example.com/iphone.jpg"],
  },
  {
    title: "Auriculares Sony",
    description: "Auriculares inalámbricos con cancelación de ruido",
    price: 299.99,
    stock: 40,
    category: "electronics",
    thumbnails: ["https://example.com/headphones.jpg"],
  },
  {
    title: "Camiseta Nike",
    description: "Camiseta deportiva de alta calidad",
    price: 29.99,
    stock: 100,
    category: "clothing",
    thumbnails: ["https://example.com/shirt.jpg"],
  },
  {
    title: "Zapatillas Adidas",
    description: "Zapatillas de running con tecnología Boost",
    price: 179.99,
    stock: 60,
    category: "clothing",
    thumbnails: ["https://example.com/shoes.jpg"],
  },
]

async function seedDatabase() {
  try {
    await connectDB()
    logger.info("🌱 Iniciando seed de la base de datos...")

    // Crear usuario admin
    const adminEmail = process.env.ADMIN_EMAIL || "admin@ecommerce.com"
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!"

    const existingAdmin = await userService.findByEmail(adminEmail)
    if (!existingAdmin) {
      const adminUser = await userService.register({
        first_name: "Admin",
        last_name: "Sistema",
        email: adminEmail,
        age: 30,
        password: adminPassword,
      })

      // Cambiar role a admin
      await userRepository.update(adminUser._id, { role: "admin" })
      logger.info(`✅ Usuario admin creado: ${adminEmail}`)
    } else {
      logger.info(`ℹ️ Usuario admin ya existe: ${adminEmail}`)
    }

    // Crear productos de ejemplo
    let createdProducts = 0
    for (const productData of sampleProducts) {
      try {
        await productService.create(productData)
        createdProducts++
        logger.info(`✅ Producto creado: ${productData.title}`)
      } catch (error) {
        if (error.code !== 11000) {
          // No es error de duplicado
          logger.warn(`⚠️ Error creando producto ${productData.title}:`, error.message)
        }
      }
    }

    logger.info(`🎉 Seed completado: ${createdProducts} productos creados`)
    process.exit(0)
  } catch (error) {
    logger.error("❌ Error en seed:", error)
    process.exit(1)
  }
}

seedDatabase()
