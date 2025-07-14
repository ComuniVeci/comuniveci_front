(async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8002/api/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Token inválido");

        const data = await response.json();

        if (!data.is_admin) {
            window.location.href = "/index.html";
        } else {
            document.getElementById("admin-content").classList.remove("hidden");
        }

    } catch (err) {
        console.warn("Error de autenticación:", err);
        localStorage.removeItem("token");
        window.location.href = "/login.html";
    }
})();
