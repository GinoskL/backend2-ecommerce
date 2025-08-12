import passport from "passport"
import { generateToken } from "../utils/jwt.js"
import { UserDTO } from "../dtos/user.dto.js"
import { setupLogger } from "../config/logger.js"

const logger = setupLogger()

export const register = (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user, info) => {
    if (err) {
      logger.error("❌ Error en registro:", err)
      return next(err)
    }

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: info?.message || "No se pudo registrar el usuario",
      })
    }

    const userDto = new UserDTO(user)
    logger.info(`✅ Usuario registrado: ${user.email}`)

    res.status(201).json({
      status: "success",
      message: "Usuario registrado exitosamente",
      payload: userDto,
    })
  })(req, res, next)
}

export const login = (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) {
      logger.error("❌ Error en login:", err)
      return next(err)
    }

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: info?.message || "Credenciales inválidas",
      })
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      cart: user.cart?.toString(),
    })

    logger.info(`✅ Login exitoso: ${user.email}`)

    res.json({
      status: "success",
      message: "Login exitoso",
      token,
      user: new UserDTO(user),
    })
  })(req, res, next)
}

export const current = (req, res) => {
  const dto = new UserDTO(req.user)
  res.json({
    status: "success",
    payload: dto,
  })
}
