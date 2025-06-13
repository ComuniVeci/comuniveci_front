document.getElementById("postForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        title: form.title.value,
        description: form.description.value,
        latitude: parseFloat(form.latitude.value),
        longitude: parseFloat(form.longitude.value),
        address: form.address.value,
        contact_email: form.contact_email.value,
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
        msgDiv.innerHTML = `<strong style="color:green">✅ Solicitud enviada correctamente</strong>`;
        form.reset();
        } else {
        msgDiv.innerHTML = `<strong style="color:red">❌ Error:</strong> ${result.detail || "Error desconocido"}`;
        }
    } catch (err) {
        document.getElementById("response").innerHTML =
        `<strong style="color:red">❌ Error de conexión:</strong> ${err}`;
    }
});
