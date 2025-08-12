import { body } from "express-validator"

export const registerValidation = [
  body("first_name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("last_name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Email inválido")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email demasiado largo"),

  body("age").isInt({ min: 18, max: 120 }).withMessage("La edad debe ser un número entre 18 y 120"),

  body("password")
    .isLength({ min: 6, max: 100 })
    .withMessage("La contraseña debe tener entre 6 y 100 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("La contraseña debe contener al menos una minúscula, una mayúscula y un número"),
]

export const loginValidation = [
  body("email").trim().isEmail().withMessage("Email inválido").normalizeEmail(),

  body("password").notEmpty().withMessage("La contraseña es requerida"),
]
