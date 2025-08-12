# Backend Node.js + Express + MongoDB

Backend API puro sin frontend. Sistema completo de e-commerce con autenticación JWT, gestión de productos, carritos y tickets.

## 🚀 Características

- ✅ **API REST** completa
- ✅ **Autenticación JWT** con Passport
- ✅ **Base de datos MongoDB** con Mongoose
- ✅ **Validaciones robustas** con express-validator
- ✅ **Logging avanzado** con Winston
- ✅ **Envío de emails** con Nodemailer
- ✅ **Arquitectura por capas** (DAO, Repository, Service)
- ✅ **Manejo de errores** centralizado
- ✅ **Rate limiting** básico
- ✅ **Script de seed** para datos iniciales

## 📋 Instalación

\`\`\`bash
# 1. Clonar o crear carpeta
mkdir backend-ecommerce
cd backend-ecommerce

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Poblar base de datos (opcional)
npm run seed

# 5. Ejecutar servidor
npm run dev  # Desarrollo
npm start    # Producción
\`\`\`

## 🔗 Endpoints API

### Autenticación
\`\`\`
POST /api/sessions/register
POST /api/sessions/login
GET  /api/sessions/current
\`\`\`

### Productos
\`\`\`
GET    /api/products
GET    /api/products/:id
POST   /api/products (admin)
PUT    /api/products/:id (admin)
DELETE /api/products/:id (admin)
\`\`\`

### Carritos
\`\`\`
POST /api/carts
POST /api/carts/:cid/product/:pid
POST /api/carts/:cid/purchase
\`\`\`

### Sistema
\`\`\`
GET /health
GET /api
\`\`\`

## 🧪 Testing con Postman/Thunder Client

1. **Registrar usuario:**
\`\`\`json
POST /api/sessions/register
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@email.com",
  "age": 25,
  "password": "Password123!"
}
\`\`\`

2. **Login:**
\`\`\`json
POST /api/sessions/login
{
  "email": "juan@email.com",
  "password": "Password123!"
}
\`\`\`

3. **Usar token en headers:**
\`\`\`
Authorization: Bearer YOUR_JWT_TOKEN
\`\`\`

## 📁 Estructura del proyecto

\`\`\`
src/
├── app.js              # Punto de entrada
├── config/             # Configuraciones
├── controllers/        # Controladores
├── daos/              # Data Access Objects
├── dtos/              # Data Transfer Objects
├── middlewares/       # Middlewares
├── models/            # Modelos de Mongoose
├── repositories/      # Capa de repositorio
├── routes/            # Rutas de la API
├── scripts/           # Scripts utilitarios
├── services/          # Lógica de negocio
├── utils/             # Utilidades
└── validators/        # Validaciones
\`\`\`

## 🔧 Scripts disponibles

- \`npm run dev\` - Servidor con nodemon
- \`npm start\` - Servidor producción
- \`npm run seed\` - Poblar DB con datos

## 📊 Logs

- \`logs/error.log\` - Solo errores
- \`logs/combined.log\` - Todos los logs
- Consola - En desarrollo

Servidor: \`http://localhost:8080\`
