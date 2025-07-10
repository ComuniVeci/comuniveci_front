(function() {
    const POST_SERVICE_URL = "http://localhost:8000/api/posts";

    async function fetchPendingPosts() {
        try {
            const res = await fetch(`${POST_SERVICE_URL}/pending/`);
            const posts = await res.json();
            renderPosts(posts);
        } catch (err) {
            document.getElementById("postList").innerHTML = `
                <p class="text-red-600 font-semibold">Error al obtener posts pendientes: ${err}</p>`;
        }
    }

    function renderPosts(posts) {
        const container = document.getElementById("postList");
        container.innerHTML = "";

        if (posts.length === 0) {
            container.innerHTML = "<p class='text-center text-gray-700'>No hay publicaciones pendientes.</p>";
            return;
        }

        posts.forEach(post => {
            const div = document.createElement("div");
            div.className = "bg-white shadow-md rounded-lg p-6 border border-gray-200";

            div.innerHTML = `
                <h3 class="text-xl font-semibold text-violet-500 mb-2">${post.title}</h3>
                <p class="mb-1"><strong>Descripción:</strong> ${post.description}</p>
                <p class="mb-1"><strong>Dirección:</strong> ${post.address}</p>
                <p class="mb-4"><strong>Contacto:</strong> ${post.contact_email}</p>
                <div class="flex gap-4">
                    <button class="approve-btn bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded transition" data-id="${post.id}">✅ Aprobar</button>
                    <button class="reject-btn bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition" data-id="${post.id}">❌ Rechazar</button>
                </div>
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