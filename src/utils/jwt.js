import jwt from "jsonwebtoken"

export function generateToken(payload, expiresIn = null) {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET no está configurado")
  }

  const options = {}
  if (expiresIn || process.env.JWT_EXPIRES_IN) {
    options.expiresIn = expiresIn || process.env.JWT_EXPIRES_IN
  }

  return jwt.sign(payload, secret, options)
}
