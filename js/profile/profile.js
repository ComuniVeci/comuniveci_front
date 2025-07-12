(async function () {
    const token = localStorage.getItem("token");
    const postContainer = document.getElementById("userPosts");
    const usernameDisplay = document.getElementById("username");

    try {
        // Obtener datos del usuario
        const userRes = await fetch("http://localhost:8002/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!userRes.ok) throw new Error("No autenticado");
        const user = await userRes.json();
        usernameDisplay.textContent = user.username;
        document.getElementById("username-avatar").textContent = user.username.charAt(0).toUpperCase();

        // Obtener posts del usuario
        const postRes = await fetch("http://localhost:8000/api/posts/user/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email })
        });

        if (!postRes.ok) throw new Error("Error al obtener tus publicaciones");

        const posts = await postRes.json();

        if (posts.length === 0) {
            postContainer.innerHTML = "<p>No has enviado publicaciones aún.</p>";
        } else {
            postContainer.innerHTML = "";
            posts.forEach(post => {
                const div = document.createElement("div");
                div.className = "bg-white p-4 rounded shadow mb-4";
                div.innerHTML = `
                    <h3 class="text-lg font-bold text-purple-600">${post.title}</h3>
                    <p><strong>Dirección:</strong> ${post.address}</p>
                    <p><strong>Descripción:</strong> ${post.description}</p>
                `;
                postContainer.appendChild(div);
            });
        }
    } catch (err) {
        console.error(err);
        postContainer.innerHTML = `<p class="text-red-500">Error al cargar tus publicaciones.</p>`;
    }
})();
