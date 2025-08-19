# 📦 Backend E-commerce – Node.js + Express + MongoDB

Backend puro (sin frontend). API REST completa para un sistema de e-commerce con autenticación JWT, gestión de productos, carritos y tickets.

## 🚀 Características

* ✅ **API REST** completa
* ✅ **Autenticación JWT** con Passport
* ✅ **Base de datos MongoDB Atlas** con Mongoose
* ✅ **Validaciones robustas** con express-validator
* ✅ **Logging avanzado** con Winston
* ✅ **Envío de emails** con Nodemailer
* ✅ **Arquitectura por capas** (DAO, Repository, Service, Controller)
* ✅ **Manejo de errores** centralizado
* ✅ **Rate limiting** básico
* ✅ **Script de seed** para datos iniciales

---

## 📋 Instalación

```bash
# 1. Clonar proyecto
git clone <url-del-repo>
cd backend-ecommerce

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MongoDB, JWT, etc.

# 4. Poblar base de datos (opcional)
npm run seed

# 5. Ejecutar servidor
npm run dev   # Desarrollo
npm start     # Producción
```

Servidor en: `http://localhost:8080`

---

## 🔗 Endpoints API

### 🔑 Autenticación

```plaintext
POST /api/sessions/register
POST /api/sessions/login
GET  /api/sessions/current
```

### 📦 Productos

```plaintext
GET    /api/products
GET    /api/products/:id
POST   /api/products        (solo admin)
PUT    /api/products/:id    (solo admin)
DELETE /api/products/:id    (solo admin)
```

### 🛒 Carrito

⚠️ Cada usuario tiene un carrito único creado automáticamente al registrarse.

```plaintext
GET    /api/carts                  # Ver mi carrito
POST   /api/carts/product/:pid     # Agregar producto
PUT    /api/carts/product/:pid     # Actualizar cantidad
DELETE /api/carts/product/:pid     # Eliminar producto
DELETE /api/carts                  # Vaciar carrito
POST   /api/carts/purchase         # Finalizar compra
```

### ⚙️ Sistema

```plaintext
GET /health
GET /api
```

---

## 🧪 Flujo de Pruebas en Postman

### 1. Registrar usuario

```json
POST http://localhost:8080/api/sessions/register
{
  "first_name": "Gino",
  "last_name": "Zampierón",
  "email": "gino@test.com",
  "age": 18,
  "password": "Password123!"
}
```

### 2. Login usuario

```json
POST http://localhost:8080/api/sessions/login
{
  "email": "gino@test.com",
  "password": "Password123!"
}
```

➡️ Copiar **token JWT** de la respuesta.

### 3. Ver mi carrito

```http
GET http://localhost:8080/api/carts
Authorization: Bearer {{USER_TOKEN}}
```

### 4. Login como Admin (precreado por seed)

```json
POST http://localhost:8080/api/sessions/login
{
  "email": "admin@ecommerce.com",
  "password": "Admin123!"
}
```

➡️ Copiar **token Admin**.

### 5. Crear producto (admin)

```http
POST http://localhost:8080/api/products
Authorization: Bearer {{ADMIN_TOKEN}}
Content-Type: application/json

{
  "title": "Producto de prueba",
  "description": "Este producto fue creado para probar la API",
  "price": 99.99,
  "stock": 10,
  "category": "test"
}
```

### 6. Agregar producto al carrito (usuario)

```http
POST http://localhost:8080/api/carts/product/{{PRODUCT_ID}}
Authorization: Bearer {{USER_TOKEN}}
```

### 7. Finalizar compra (usuario)

```http
POST http://localhost:8080/api/carts/purchase
Authorization: Bearer {{USER_TOKEN}}
```

✅ Devuelve **ticket de compra** con código único.

---

## 📁 Estructura del Proyecto

```plaintext
src/
├── app.js              # Punto de entrada
├── config/             # Configuraciones
├── controllers/        # Controladores
├── daos/               # Data Access Objects
├── dtos/               # Data Transfer Objects
├── middlewares/        # Middlewares
├── models/             # Modelos de Mongoose
├── repositories/       # Repositorios
├── routes/             # Definición de rutas
├── scripts/            # Seed y utilitarios
├── services/           # Lógica de negocio
├── utils/              # Helpers (hash, JWT, email)
└── validators/         # Validaciones
```

---

## ✅ Checklist antes de entregar

* [x] Registro/Login de usuario funciona
* [x] Token JWT válido y protege endpoints
* [x] Admin puede crear/editar/eliminar productos
* [x] Usuario puede ver productos y comprar
* [x] Carrito único por usuario funciona
* [x] Ticket se genera correctamente
* [x] MongoDB Atlas conectado
* [x] README actualizado con instrucciones

---

## 👤 Usuarios de prueba

### Admin (cargado con seed)

* Email: `admin@ecommerce.com`
* Password: `Admin123!`

### Usuario regular

* Crear con `/api/sessions/register`
