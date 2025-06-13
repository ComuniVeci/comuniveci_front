# 📜 CHANGELOG - ComuniVeci Frontend

Historial de cambios del módulo de interfaz gráfica de usuario para el prototipo ComuniVeci.

---

## [1.0.0] - 2025-06-13

### 🚀 Funcionalidades iniciales

- ✅ Se crea la estructura base del frontend con HTML, CSS y JS puro.
- ✅ Se configura servidor local estático con serve (Node.js).
- ✅ Se implementa el formulario para crear publicaciones (form.html).
- ✅ Se conecta con post-service (/api/posts/) usando fetch.
- ✅ Se implementa la vista administrativa (admin.html):
  - Lista posts pendientes desde /api/posts/pending/
  - Permite aprobar (/approve/) o eliminar (/delete/) solicitudes
- ✅ Se implementa el mapa (index.html) con Leaflet.js:
  - Se centra en Bogotá por defecto
  - Carga marcadores desde map-service (/api/map/posts/)
  - Muestra título y dirección en popups

---

## 📅 Próximas mejoras sugeridas

- [ ] Validación en tiempo real de formularios
- [ ] Visualización detallada de un post desde el mapa
- [ ] Notificaciones visuales al aprobar o rechazar posts
- [ ] Reorganización de código JS en módulos
- [ ] Migración opcional a React o Vue si el proyecto escala

