(function() {
    const POST_SERVICE_URL = "http://localhost:8000/api/posts";
    const ADMIN_SERVICE_URL = "http://localhost:8003/api/admin";

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
            div.className = "bg-gray-50 border border-gray-300 rounded p-4";

            div.innerHTML = `
                <h3 class="text-lg font-semibold text-violet-600">${post.title}</h3>
                <p><strong>Descripción:</strong> ${post.description}</p>
                <p><strong>Dirección:</strong> ${post.address}</p>
                <p><strong>Contacto:</strong> ${post.contact_email}</p>
                <div class="mt-2 flex gap-3">
                    <button class="approve-btn bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded" data-id="${post.id}">✅ Aprobar</button>
                    <button class="reject-btn bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded" data-id="${post.id}">❌ Rechazar</button>
                </div>
            `;

            div.querySelector(".approve-btn").addEventListener("click", () => approvePost(post.id));
            div.querySelector(".reject-btn").addEventListener("click", () => rejectPost(post.id));
            
            container.appendChild(div);
        });
    }

    async function approvePost(postId) {
        try {
            const res = await fetch(`${POST_SERVICE_URL}/${postId}/approve/`, {method: "PATCH"});
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
            const res = await fetch(`${POST_SERVICE_URL}/${postId}/delete/`, {method: "DELETE"});
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

    // Mostrar dcatos de los posts
    async function fetchStatistics() {
        try {
            const res = await fetch(`${ADMIN_SERVICE_URL}/posts/statistics`);
            const data = await res.json();
            const container = document.getElementById("statistics");
            container.innerHTML = `
                <ul class="text-gray-700 leading-relaxed">
                <li><strong>🟢 Aprobadas:</strong> ${data.approved_posts}</li>
                <li><strong>🕐 Pendientes:</strong> ${data.pending_posts}</li>
                <li><strong>📌 Total:</strong> ${data.total_posts}</li>
                </ul>
            `;
        } catch {
            document.getElementById("statistics").innerHTML = `<p class="text-red-600">Error al cargar estadísticas</p>`;
        }
    }

    // Mostrar usuarios
    async function fetchUsers() {
        try {
            const res = await fetch(`${ADMIN_SERVICE_URL}/users`);
            const users = await res.json();
            const container = document.getElementById("users");
            if (users.length === 0) {
                container.innerHTML = `<p class="text-gray-600">No hay usuarios registrados.</p>`;
                return;
            }

            container.innerHTML = users.map(u =>
                `<div class="border-b py-1">
                <span class="text-violet-600 font-medium">${u.username}</span> &lt;${u.email}&gt;
                ${u.is_admin ? '<span class="ml-2 text-xs text-white bg-indigo-500 px-2 py-0.5 rounded">admin</span>' : ''}
                </div>`
            ).join('');
        } catch {
            document.getElementById("users").innerHTML = `<p class="text-red-600">Error al cargar usuarios</p>`;
        }
    }

    // Mostrar métricas
    async function fetchMetrics() {
        try {
            const res = await fetch(`${ADMIN_SERVICE_URL}/metrics`);
            const data = await res.json();

            const container = document.getElementById("metrics");
            container.innerHTML = ""; // Limpiar previo

            const title = document.createElement("h3");
            title.className = "text-lg font-semibold text-purple-800";
            title.textContent = "📊 Métricas - Auth Service";
            container.appendChild(title);

            // Subgrupo: total de peticiones por endpoint
            const reqTitle = document.createElement("h4");
            reqTitle.className = "font-medium text-gray-700 mt-2";
            reqTitle.textContent = "Peticiones por Endpoint:";
            container.appendChild(reqTitle);

            Object.entries(data.requests_total || {}).forEach(([key, val]) => {
                const p = document.createElement("p");
                p.textContent = `• ${key}: ${val}`;
                container.appendChild(p);
            });

            // Subgrupo: duración por endpoint
            const durTitle = document.createElement("h4");
            durTitle.className = "font-medium text-gray-700 mt-3";
            durTitle.textContent = "Duración Promedio (s):";
            container.appendChild(durTitle);

            Object.entries(data.request_duration_seconds || {}).forEach(([key, val]) => {
                const p = document.createElement("p");
                p.textContent = `• ${key}: ${val.toFixed(3)} s`;
                container.appendChild(p);
            });

            // Subgrupo: métricas personalizadas
            const customTitle = document.createElement("h4");
            customTitle.className = "font-medium text-gray-700 mt-3";
            customTitle.textContent = "Métricas Personalizadas:";
            container.appendChild(customTitle);

            Object.entries(data.custom_metrics || {}).forEach(([key, val]) => {
                const p = document.createElement("p");
                p.textContent = `• ${key}: ${val}`;
                container.appendChild(p);
            });

        } catch (err) {
            document.getElementById("metrics").innerHTML = `<p class="text-red-600">Error al obtener métricas: ${err}</p>`;
        }
    }


    // Ejecutar todo al iniciar
    fetchPendingPosts();
    fetchStatistics();
    fetchUsers();
    fetchMetrics();
})();