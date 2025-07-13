# 🌐 ComuniVeci Frontend

Este frontend es una interfaz sencilla en HTML, CSS y JavaScript puro (sin frameworks) que permite:

- 📝 Enviar solicitudes de publicación a post-service.
- ✅ Aprobar o rechazar publicaciones desde una vista de administrador.
- 🗺️ Visualizar publicaciones aprobadas en un mapa interactivo usando Leaflet.js y map-service.
- 🔐 Iniciar sesión, registrarse y manejar sesiones de usuario autenticadas.
- 🧑‍💻 Detectar y diferenciar usuarios administradores para restringir acceso al panel administrativo.
- 📡 Proteger rutas del frontend según si el usuario está autenticado o no.
- 👤 Ver perfil del usuario autenticado con sus publicaciones.
- 🧪 Ejecutar pruebas automáticas del frontend con Selenium.

---

## ⚙️ Requisitos

- Tener un navegador moderno (Chrome, Firefox, Edge)
- Node.js instalado (solo para servir el frontend)
- Que los servicios backend estén corriendo:
  - auth-service: http://localhost:8002
  - post-service: http://localhost:8000
  - map-service: http://localhost:8001
  - admin-service: http://localhost:8003 (opcional pero recomendado)

---

## 🚀 Instrucciones para correr el frontend

1. Clona este repositorio:

```bash
git clone https://github.com/<tu-usuario>/comuniveci-frontend.git
cd comuniveci-frontend
```

2. Instala el servidor estático serve (una sola vez):

```bash
npm install -g serve
```

3. Lanza el frontend:

```bash
serve . -p 8080
```

4. Abre el navegador en:

- http://localhost:8080/index.html → Mapa con publicaciones aprobadas

- http://localhost:8080/form.html → Formulario para crear publicación (requiere login)

- http://localhost:8080/admin.html → Panel de administrador (solo usuarios admin)

- http://localhost:8080/login.html → Página de inicio de sesión

- http://localhost:8080/register.html → Página de registro de usuario

- http://localhost:8080/profile.html → Perfil del usuario autenticado


✅ El frontend debe funcionar correctamente si los servicios backend tienen habilitado CORS.

## 🗂️ Estructura del proyecto

```bash
comuniveci-frontend/
├── index.html              # Página principal del mapa
├── form.html               # Formulario de creación de posts
├── admin.html              # Panel de administración de publicaciones
├── login.html              # Página de login
├── register.html           # Página de registro
├── profile.html            # Página de perfil de usuario
├── js/
│   ├── map/
│   │   ├── map.js              # Mapa de publicaciones aprobadas
│   ├── form/
│   │   ├── form.js             # Envío de formulario de post
│   ├── auth/
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── header.js           # Header dinámico según login y rol
│   ├── profile/
│   │   ├── profile.js          # Carga del perfil del usuario
│   ├── admin/
│   │   ├── admin.js            # Panel admin: posts, estadísticas, métricas, usuarios
│   └── guards/
│       └── protect_admin.js
│       └── protect_authenticated.js

```

## 🌍 Tecnologías utilizadas

- HTML, CSS y JavaScript puro

- Tailwind CSS (vía CDN)

- Leaflet.js para el mapa

- fetch API para consumir los microservicios

- JWT (JSON Web Tokens) para autenticación en frontend

- erve para levantar un servidor local simple

- Selenium + pytest para pruebas automáticas del frontend

## 🛡️ Notas de seguridad

- Las páginas protegidas (form.html, admin.html y profile.html) validan el token antes de cargar.

- El token se almacena en localStorage del navegador.

- El panel de administración solo es accesible para usuarios con rol administrador.

- El campo de correo en el formulario se autocompleta y no es editable para asegurar la integridad del autor.

- El perfil de usuario sólo es accesible si hay sesión activa.