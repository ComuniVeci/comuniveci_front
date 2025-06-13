# 🌐 ComuniVeci Frontend

Este frontend es una interfaz sencilla en HTML, CSS y JavaScript puro (sin frameworks) que permite:

- 📝 Enviar solicitudes de publicación a post-service.
- ✅ Aprobar o rechazar publicaciones desde una vista de administrador.
- 🗺️ Visualizar publicaciones aprobadas en un mapa interactivo usando Leaflet.js y map-service.

---

## ⚙️ Requisitos

- Tener un navegador moderno (Chrome, Firefox, Edge)
- Node.js instalado (solo para servir el frontend)
- Que los servicios backend estén corriendo:
  - post-service: http://localhost:8000
  - map-service: http://localhost:8001

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

- http://localhost:8080/form.html → Formulario para crear publicación

- http://localhost:8080/admin.html → Panel de administrador (aprobar/rechazar)

- http://localhost:8080/index.html → Mapa con publicaciones aprobadas


✅ El frontend debe funcionar correctamente si los servicios backend tienen habilitado CORS.

## 🗂️ Estructura del proyecto

```bash
comuniveci-frontend/
├── index.html        # Mapa con publicaciones aprobadas
├── form.html         # Formulario para crear posts
├── admin.html        # Página de aprobación de publicaciones
├── css/
│   └── styles.css    # Estilos globales (opcional)
├── js/
│   ├── form.js       # Lógica para enviar formulario
│   ├── admin.js      # Lógica para listar y aprobar/rechazar posts
│   └── map.js        # Lógica para mostrar el mapa y marcadores
```

## 🌍 Tecnologías utilizadas

- HTML, CSS y JavaScript puro

- Leaflet.js para el mapa

- fetch API para consumir los microservicios

- serve para levantar un servidor local simple

## 🛡️ Notas de seguridad

- Este frontend no implementa autenticación en el prototipo actual.

- En producción, se recomienda configurar autenticación de usuario y control de acceso para el panel administrativo.