# 📌 Sistema POS

## 📋 Descripción
Este proyecto es un **Sistema POS (Point of Sale)** diseñado para gestionar ventas en distintos tipos de negocios. Permite administrar usuarios, productos, inventarios y órdenes de compra, ofreciendo una solución eficiente y escalable para comercios minoristas, restaurantes, tiendas y más.

## 🚀 Tecnologías Utilizadas
- **Backend**: NestJS con Prisma ORM
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT con bcrypt

## 📂 Estructura del Proyecto
```
📦 backend
 ┣ 📂 src
 ┃ ┣ 📂middlewares     
 ┃ ┣ 📂 modules
 ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┣ 📂 user
 ┃ ┃ ┣ 📂 products
 ┃ ┃ ┣ 📂 inventory
 ┃ ┃ ┗ 📂 order
 ┃ ┣ 📂 prisma
 ┃ ┣ 📜 main.ts
 ┃ ┣ 📜 app.module.ts
 ┗ 📜 package.json
```

## 🛠 Instalación y Configuración
### **1️⃣ Clonar el repositorio**
```sh
git clone https://github.com/andresbena04/pos-system-nestjs.git
cd pos-system-nestjs
```

### **2️⃣ Configurar el Backend**
```sh
cd backend
cp .env.example .env  # Configurar variables de entorno
```
Configura las variables de entorno en el archivo .env:
```sh
DATABASE_URL=postgresql://user:password@localhost:5432/nameBD
JWT_SECRET=clave_secreta
``` 
### **3️⃣ Instalar dependencias y ejecutar migraciones**
```sh
npm install
npm run prisma:migrate  # Ejecutar migraciones de Prisma
npm run start:dev
``` 

## 🔑 Autenticación
- Se utiliza **nestjs/jwt** para la autenticación.
- Las contraseñas se almacenan de forma segura con **bcryptjs**.

## 🛒 Funcionalidades Principales
- **Gestión de Usuarios** (Registro, Login, Roles)
- **Administración de Productos** (CRUD de productos e invetario)
- **Gestión de Órdenes** (Creación y consulta de órdenes)

## 📝 Endpoints Principales
### 🔐**Autenticación**
| Método | Endpoint         | Descripción       |
|--------|----------------|------------------|
| POST   | /auth/register | Registro de usuario |
| POST   | /auth/login    | Inicio de sesión  |

### 📦**Productos**
| Método | Endpoint       | Descripción             |
|--------|--------------|-------------------------|
| GET    | /products    | Obtener todos los productos |
| GET    | /products/:id    | Obtener un producto |
| POST   | /products    | Crear un nuevo producto |

### 📋**Órdenes**
| Método | Endpoint       | Descripción               |
|--------|--------------|---------------------------|
| GET    | /orders      | Obtener todas las órdenes |
| POST   | /orders      | Crear una nueva orden     |

## 📌 Contribución
Si deseas contribuir al proyecto:
1. **Haz un fork** del repositorio.
2. **Crea una nueva rama** (`feature/nueva-funcionalidad`).
3. **Haz un commit** de tus cambios.
4. **Envía un Pull Request**.

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente.

---
**Desarrollado con ❤️** 

