import nodemailer from "nodemailer"
import { setupLogger } from "../config/logger.js"

const logger = setupLogger()

export function createTransporter() {
  const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env

  if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS) {
    throw new Error("Faltan credenciales de email en el .env")
  }

  const transporter = nodemailer.createTransporter({
    host: MAIL_HOST,
    port: Number.parseInt(MAIL_PORT),
    secure: Number.parseInt(MAIL_PORT) === 465,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  })

  return transporter
}

export async function sendPurchaseEmail({ to, ticket }) {
  try {
    const transporter = createTransporter()
    const fromEmail = process.env.MAIL_FROM || '"E-commerce" <noreply@ecommerce.com>'

    const html = `
      <h2>¡Compra Confirmada!</h2>
      <p>Gracias por tu compra. Aquí están los detalles:</p>
      <ul>
        <li><strong>Código:</strong> ${ticket.code}</li>
        <li><strong>Fecha:</strong> ${new Date(ticket.purchase_datetime).toLocaleString()}</li>
        <li><strong>Monto:</strong> $${ticket.amount.toFixed(2)}</li>
        <li><strong>Comprador:</strong> ${ticket.purchaser}</li>
      </ul>
      <p>¡Gracias por elegirnos!</p>
    `

    await transporter.sendMail({
      from: fromEmail,
      to,
      subject: `Confirmación de Compra - ${ticket.code}`,
      html,
    })

    logger.info(`✅ Email enviado a ${to}`)
  } catch (error) {
    logger.error(`❌ Error enviando email a ${to}:`, error)
    throw error
  }
}
