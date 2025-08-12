import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es requerido"],
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
      maxlength: [100, "El título no puede exceder 100 caracteres"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
      trim: true,
      minlength: [10, "La descripción debe tener al menos 10 caracteres"],
      maxlength: [1000, "La descripción no puede exceder 1000 caracteres"],
    },
    price: {
      type: Number,
      required: [true, "El precio es requerido"],
      min: [0.01, "El precio debe ser mayor a 0"],
      index: true,
    },
    stock: {
      type: Number,
      required: [true, "El stock es requerido"],
      min: [0, "El stock no puede ser negativo"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "La categoría es requerida"],
      trim: true,
      lowercase: true,
      minlength: [2, "La categoría debe tener al menos 2 caracteres"],
      maxlength: [50, "La categoría no puede exceder 50 caracteres"],
      index: true,
    },
    thumbnails: {
      type: [String],
      default: [],
      validate: {
        validator: (v) => v.length <= 5,
        message: "Máximo 5 thumbnails permitidas",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual para disponibilidad
productSchema.virtual("isAvailable").get(function () {
  return this.stock > 0 && this.isActive
})

export const ProductModel = mongoose.model("Product", productSchema)
