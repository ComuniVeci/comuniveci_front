(function () {
  document.addEventListener("DOMContentLoaded", async function () {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login.html"; // Redirigir si no está logeado
      return;
    }

    try {
      const res = await fetch("http://localhost:8002/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Token inválido");
      }

      // Si pasa, no hacemos nada. El usuario está autenticado.

    } catch (err) {
      console.warn("Acceso no autorizado:", err);
      localStorage.removeItem("token");
      window.location.href = "/login.html";
    }
  });
})();