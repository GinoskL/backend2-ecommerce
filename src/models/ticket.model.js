import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "El código es requerido"],
      unique: true,
      index: true,
      uppercase: true,
    },
    purchase_datetime: {
      type: Date,
      default: Date.now,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, "El monto es requerido"],
      min: [0, "El monto no puede ser negativo"],
    },
    purchaser: {
      type: String,
      required: [true, "El comprador es requerido"],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email del comprador inválido"],
    },
  },
  {
    timestamps: true,
  },
)

export const TicketModel = mongoose.model("Ticket", ticketSchema)
