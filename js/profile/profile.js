(async function () {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:8002/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Token inválido");

    const user = await res.json();
    document.getElementById("username").textContent = `Hola, ${user.username}`;
  } catch (err) {
    console.warn("Error al cargar datos del perfil:", err);
    document.getElementById("username").textContent = "No se pudo cargar el perfil.";
  }
})();
