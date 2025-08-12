import { body, param, query } from "express-validator"

export const createProductValidation = [
  body("title").trim().isLength({ min: 3, max: 100 }).withMessage("El título debe tener entre 3 y 100 caracteres"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("La descripción debe tener entre 10 y 1000 caracteres"),

  body("price").isFloat({ min: 0.01 }).withMessage("El precio debe ser un número mayor a 0"),

  body("stock").isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a 0"),

  body("category").trim().isLength({ min: 2, max: 50 }).withMessage("La categoría debe tener entre 2 y 50 caracteres"),

  body("thumbnails")
    .optional()
    .isArray()
    .withMessage("Las thumbnails deben ser un array")
    .custom((value) => {
      if (value && value.length > 5) {
        throw new Error("Máximo 5 thumbnails permitidas")
      }
      return true
    }),
]

export const updateProductValidation = [
  param("pid").isMongoId().withMessage("ID de producto inválido"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El título debe tener entre 3 y 100 caracteres"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("La descripción debe tener entre 10 y 1000 caracteres"),

  body("price").optional().isFloat({ min: 0.01 }).withMessage("El precio debe ser un número mayor a 0"),

  body("stock").optional().isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a 0"),

  body("category")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("La categoría debe tener entre 2 y 50 caracteres"),
]

export const productIdValidation = [param("pid").isMongoId().withMessage("ID de producto inválido")]

export const productQueryValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("La página debe ser un número mayor a 0"),

  query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("El límite debe ser un número entre 1 y 50"),

  query("category")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("La categoría debe tener entre 2 y 50 caracteres"),

  query("search")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("La búsqueda debe tener entre 2 y 100 caracteres"),
]
