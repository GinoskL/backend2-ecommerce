import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    last_name: {
      type: String,
      required: [true, "El apellido es requerido"],
      trim: true,
      minlength: [2, "El apellido debe tener al menos 2 caracteres"],
      maxlength: [50, "El apellido no puede exceder 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
    },
    age: {
      type: Number,
      required: [true, "La edad es requerida"],
      min: [18, "Debes ser mayor de 18 años"],
      max: [120, "Edad inválida"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "El role debe ser user o admin",
      },
      default: "user",
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
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

// Virtual para nombre completo
userSchema.virtual("fullName").get(function () {
  return `${this.first_name} ${this.last_name}`
})

export const UserModel = mongoose.model("User", userSchema)
