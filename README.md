---

# 📄 README - Backend Ecommerce

## 📌 Descripción

Este proyecto es un **servidor backend puro** para un e-commerce, desarrollado en **Node.js + Express + MongoDB Atlas**.
Implementa autenticación con **Passport + JWT**, manejo de roles, persistencia con **DAO, DTO y Repository**, y lógica de compra con generación de tickets.

---

## 🚀 Instalación y Configuración

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repo>
cd <nombre-del-proyecto>
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env` en la raíz con:

```env
PORT=8080
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/ecommerce
JWT_SECRET=claveSuperSecreta
```

💡 **Importante:**
En MongoDB Atlas, configurar **Network Access** con `0.0.0.0/0` para permitir conexiones externas.

### 4️⃣ Iniciar el servidor

```bash
npm run dev   # Modo desarrollo (nodemon)
npm start     # Modo producción
```

Servidor corriendo en: `http://localhost:8080`

---

## 🗂 Estructura del Proyecto

```
src/
├── app.js             # Punto de entrada
├── config/            # Config DB, Passport, etc.
├── controllers/       # Controladores de rutas
├── daos/              # Data Access Objects
├── dtos/              # Data Transfer Objects
├── middlewares/       # Autenticación y autorización
├── models/            # Modelos de Mongoose
├── repositories/      # Capa Repository
├── routes/            # Rutas agrupadas
├── services/          # Lógica de negocio
└── utils/             # Utilidades (hash, JWT, email)
```

---

## 🔑 Roles y Autorización

* **Admin** → puede crear, actualizar y eliminar productos.
* **User** → puede agregar productos a su carrito y comprar.

---

## 📌 Endpoints Principales

### 🧑‍💻 Autenticación

#### Registrar usuario

```http
POST /api/sessions/register
```

```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@test.com",
  "age": 25,
  "password": "Password123!"
}
```

#### Login

```http
POST /api/sessions/login
```

```json
{
  "email": "juan@test.com",
  "password": "Password123!"
}
```

#### Usuario actual (DTO)

```http
GET /api/sessions/current
Authorization: Bearer <token>
```

---

### 📦 Productos

* **Listar** → `GET /api/products`
* **Obtener uno** → `GET /api/products/:id`
* **Crear (Admin)** → `POST /api/products`
* **Actualizar (Admin)** → `PUT /api/products/:id`
* **Eliminar (Admin)** → `DELETE /api/products/:id`

---

### 🛒 Carritos

* **Crear carrito** → `POST /api/carts`
* **Agregar producto (User)** → `POST /api/carts/:cid/product/:pid`
* **Finalizar compra (User)** → `POST /api/carts/:cid/purchase`

---

### 🎟 Tickets

Al finalizar una compra exitosa, se genera un ticket con:

* Código único
* Fecha y hora
* Total de la compra
* Email del comprador

---

## 🧪 Guía de Pruebas con Postman

1. **Health Check**

```http
GET /health
```

2. **Login Admin**

```http
POST /api/sessions/login
{
  "email": "admin@ecommerce.com",
  "password": "Admin123!"
}
```

Copiar el token para operaciones de admin.

3. **Crear Producto (Admin)**

```http
POST /api/products
Authorization: Bearer <token_admin>
{
  "title": "Laptop",
  "description": "Laptop gamer",
  "price": 1500,
  "stock": 10,
  "category": "electronics"
}
```

4. **Registrar y loguear usuario normal**

```http
POST /api/sessions/register
POST /api/sessions/login
```

Copiar token de usuario.

5. **Crear carrito y agregar producto**

```http
POST /api/carts
POST /api/carts/<cid>/product/<pid>
```

6. **Finalizar compra**

```http
POST /api/carts/<cid>/purchase
```

---

## ✅ Checklist antes de entregar

* [ ] `npm install` funciona sin errores
* [ ] `.env` configurado con MONGO\_URI válido
* [ ] Rutas de registro/login funcionan
* [ ] Middleware de roles funcionando
* [ ] DAO, DTO y Repository implementados
* [ ] Compra genera ticket correctamente
* [ ] El carrito se actualiza después de comprar
