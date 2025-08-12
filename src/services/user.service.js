import mongoose from "mongoose"
import { userRepository } from "../repositories/user.repository.js"
import { cartRepository } from "../repositories/cart.repository.js"
import { hashPassword, comparePassword } from "../utils/hash.js"
import { setupLogger } from "../config/logger.js"

const logger = setupLogger()

class UserService {
  async register({ first_name, last_name, email, age, password }) {
    if (!first_name || !last_name || !email || !age || !password) {
      const err = new Error("Campos obligatorios faltantes")
      err.status = 400
      throw err
    }

    const passwordHash = await hashPassword(password)
    const cart = await cartRepository.create()

    const user = await userRepository.create({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.toLowerCase().trim(),
      age: Number.parseInt(age),
      password: passwordHash,
      role: "user",
      cart: cart._id,
    })

    logger.info(`Usuario registrado: ${email}`)
    return user
  }

  async findByEmail(email) {
    if (!email) return null
    return await userRepository.findByEmail(email.toLowerCase().trim())
  }

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null
    return await userRepository.findById(id)
  }

  async validatePassword(user, plainPassword) {
    return await comparePassword(plainPassword, user.password)
  }
}

export const userService = new UserService()
