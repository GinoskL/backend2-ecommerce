import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { userService } from "../services/user.service.js"
import { setupLogger } from "./logger.js"

const logger = setupLogger()

// Estrategia de registro
passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, age } = req.body

        // Verificar si el usuario ya existe
        const existing = await userService.findByEmail(email)
        if (existing) {
          logger.warn(`Intento de registro con email existente: ${email}`)
          return done(null, false, { message: "El email ya está registrado" })
        }

        // Crear nuevo usuario
        const user = await userService.register({
          first_name,
          last_name,
          email,
          age,
          password,
        })

        logger.info(`✅ Usuario registrado: ${email}`)
        return done(null, user)
      } catch (err) {
        logger.error("❌ Error en registro:", err)
        return done(err)
      }
    },
  ),
)

// Estrategia de login
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        // Buscar usuario
        const user = await userService.findByEmail(email)
        if (!user) {
          logger.warn(`❌ Intento de login con email inexistente: ${email}`)
          return done(null, false, { message: "Credenciales inválidas" })
        }

        // Validar contraseña
        const valid = await userService.validatePassword(user, password)
        if (!valid) {
          logger.warn(`❌ Intento de login con contraseña incorrecta: ${email}`)
          return done(null, false, { message: "Credenciales inválidas" })
        }

        logger.info(`✅ Login exitoso: ${email}`)
        return done(null, user)
      } catch (err) {
        logger.error("❌ Error en login:", err)
        return done(err)
      }
    },
  ),
)

// Estrategia JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await userService.findById(jwtPayload.id)
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      } catch (err) {
        logger.error("❌ Error en JWT strategy:", err)
        return done(err, false)
      }
    },
  ),
)

export default passport
