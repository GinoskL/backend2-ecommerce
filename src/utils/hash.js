import bcrypt from "bcrypt"

const SALT_ROUNDS = 12

export async function hashPassword(password) {
  if (!password) {
    throw new Error("Password es requerido")
  }
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function comparePassword(password, hash) {
  if (!password || !hash) {
    return false
  }
  return await bcrypt.compare(password, hash)
}
