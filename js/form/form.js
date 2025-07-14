(async function() {

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8002/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
    });

    const user = await res.json();

    emailField = document.getElementById("contact_email");
    emailField.value = user.email;

    document.getElementById("postForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const form = e.target;
        const data = {
            title: form.title.value,
            description: form.description.value,
            latitude: parseFloat(form.latitude.value),
            longitude: parseFloat(form.longitude.value),
            address: form.address.value,
            contact_email: user.email,
            images: form.images.value
            ? form.images.value.split(",").map(url => url.trim())
            : [],
        };

        try {
            const response = await fetch("http://localhost:8000/api/posts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            const msgDiv = document.getElementById("response");

            if (response.ok) {
                msgDiv.className = "text-green-600 font-semibold text-center";
                msgDiv.innerHTML = `✅ Solicitud enviada correctamente`;
                form.reset();
                // volver a colocar el correo en caso de que reset lo borre
                emailField.value = user.email;
            } else {
                msgDiv.className = "text-red-600 font-semibold text-center";
                msgDiv.innerHTML = `❌ Error: ${result.detail || "Error desconocido"}`;
            }
        } catch (err) {
            const msgDiv = document.getElementById("response");
            msgDiv.className = "text-red-600 font-semibold text-center";
            msgDiv.innerHTML = `❌ Error de conexión: ${err}`;
        }
    });
})();