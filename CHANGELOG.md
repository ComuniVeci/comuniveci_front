# 📜 CHANGELOG - ComuniVeci Frontend

Historial de cambios del módulo de interfaz gráfica de usuario para el prototipo ComuniVeci.

---

## [1.2.0] - 2025-07-13

### 🎉 Nuevas funcionalidades

- 👤 Se implementó página de perfil de usuario (profile.html):
  - Muestra el nombre del usuario autenticado.
  - Permite crear nuevas publicaciones desde allí.
  - Lista todas las publicaciones creadas por el usuario.

- 📊 Panel de administración (admin.html) ampliado:
  - Muestra número de posts aprobados, pendientes y total.
  - Lista básica de usuarios registrados.
  - Sección para visualizar métricas clave del auth-service.

- 🧪 Se implementaron pruebas automáticas del frontend con Selenium y Pytest:
  - Test de login exitoso y logout.
  - Test de registro y redirección.
  - Test completo del panel de administración (admin.html).
  - Los tests eliminan automáticamente los usuarios creados para mantener la BD limpia.

- 🧭 El botón "Volver al mapa" se añadió al panel de administración y perfil.

### 🛠️ Cambios internos

- Se añadieron IDs específicos a los divs del panel de administración para facilitar el testing.
- El manejo de errores en el frontend fue refinado para fallos en los fetch y alertas visuales.
- Se mejoró la protección de rutas sensibles.

---

## [1.1.0] - 2025-07-10

### 🎉 Nuevas funcionalidades

- 🔐 Se integró autenticación de usuarios con auth-service.

- ✅ Se agregó página de login (login.html) y registro (register.html).

- 🧑‍💻 Se diferencia entre usuarios normales y administradores.

- 🧭 Se protege el acceso a admin.html solo para usuarios administradores.

- 🧱 Se protege el acceso a form.html solo para usuarios autenticados.

- 📨 El correo de contacto en el formulario se autocompleta y no es editable.

- 🧭 Header dinámico: muestra botones según login y rol del usuario.

- 🎨 Se reemplazaron los estilos CSS manuales por clases de Tailwind.

- 🌐 Se reorganizó el proyecto:

  - /js/auth/ para lógica de login y registro

  - /js/admin/ para lógica de administración

  - /js/protections/ para protección de rutas

- 💬 Mensajes de éxito y error mejorados para formularios y botones.

- 🔁 Se mejoró la UX en el botón logout y en el panel de administración.

- 🧪 Validación de sesión mediante token en todas las páginas restringidas.

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

- Visualización detallada de una publicación en el mapa

- Inclusión de imágenes asociadas a los posts

- Componente de perfil de usuario (perfil.html)

- Validaciones visuales en formularios

- Migración progresiva a React o Vue si el proyecto escala

-  Almacenamiento de imágenes en el backend o servicios externos (ej. Cloudinary)

