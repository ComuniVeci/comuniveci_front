(function() {
    const POST_SERVICE_URL = "http://localhost:8000/api/posts";

    async function fetchPendingPosts() {
        try {
            const res = await fetch(`${POST_SERVICE_URL}/pending/`);
            const posts = await res.json();
            renderPosts(posts);
        } catch (err) {
            document.getElementById("postList").innerHTML = `<p style="color:red">Error al obtener posts pendientes: ${err}</p>`;
        }
    }

    function renderPosts(posts) {
        const container = document.getElementById("postList");
        container.innerHTML = "";

        if (posts.length === 0) {
            container.innerHTML = "<p>No hay publicaciones pendientes.</p>";
            return;
        }

        posts.forEach(post => {
            const div = document.createElement("div");
            div.classList.add("post");
            div.innerHTML = `
            <h3>${post.title}</h3>
            <p><strong>Descripción:</strong> ${post.description}</p>
            <p><strong>Dirección:</strong> ${post.address}</p>
            <p><strong>Contacto:</strong> ${post.contact_email}</p>
            <button class="approve-btn" data-id="${post.id}">✅ Aprobar</button>
            <button class="reject-btn" data-id="${post.id}">❌ Rechazar</button>
            <hr>
            `;

            div.querySelector(".approve-btn").addEventListener("click", () => approvePost(post.id));
            div.querySelector(".reject-btn").addEventListener("click", () => rejectPost(post.id));
            
            container.appendChild(div);
        });
    }

    async function approvePost(postId) {
        try {
            const res = await fetch(`${POST_SERVICE_URL}/${postId}/approve/`, {
            method: "PATCH",
            });
            if (res.ok) {
            alert("Publicación aprobada");
            fetchPendingPosts();
            } else {
            alert("Error al aprobar");
            }
        } catch (err) {
            alert("Error de red al aprobar");
        }
    }

    async function rejectPost(postId) {
        if (!confirm("¿Estás seguro de que deseas rechazar esta solicitud?")) return;

        try {
            const res = await fetch(`${POST_SERVICE_URL}/${postId}/delete/`, {
            method: "DELETE",
            });
            if (res.ok) {
            alert("Publicación rechazada (eliminada)");
            fetchPendingPosts();
            } else {
            alert("Error al rechazar");
            }
        } catch (err) {
            alert("Error de red al rechazar");
        }
    }

    // Cargar al iniciar
    fetchPendingPosts();
})();