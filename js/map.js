(function() {
    // Coordenadas centrales de Bogotá
    const bogotaCoords = [4.711, -74.072];
    // Endpoint map_service
    const MAP_SERVICE_URL = "http://localhost:8001/api/map/posts/";

    // Crear el mapa y centrarlo en Bogotá
    const map = L.map("map").setView(bogotaCoords, 13);

    // Cargar capa base desde OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    let markers = {};

    // Obtener los posts aprobados desde map-service
    async function cargarPostsAprobados() {
        try {
            const res = await fetch(MAP_SERVICE_URL);
            const posts = await res.json();

            posts.forEach(post => {
                const marker = L.marker([post.latitude, post.longitude]).addTo(map);
                marker.bindPopup(`
                    <strong>${post.title}</strong><br>
                    ${post.address}
                `);

                markers[post.id] = marker;

                agregarPostALista(post);
            
            });
        } catch (err) {
            console.error("Error al cargar los posts aprobados:", err);
            alert("No se pudieron cargar los posts aprobados desde el mapa.");
        }
    }

    function agregarPostALista(post) {
        const listContainer = document.getElementById("postList");
        const postItem = document.createElement("div");

        // Clases de Tailwind que replican los estilos anteriores
        postItem.className = "p-4 border border-gray-300 rounded-lg cursor-pointer transition-colors hover:bg-[#f0e6ff]";
        
        postItem.innerHTML = `
            <h3 class="mb-1 text-violet-400 font-semibold">${post.title}</h3>
            <p><strong>Dirección:</strong> ${post.address}</p>
            <p><strong>Descripción:</strong> ${post.description}</p>
        `;

        postItem.addEventListener("click", () => {
            // Centrar el mapa con animación
            map.flyTo([post.latitude, post.longitude], 16, { duration: 1.2 });

            // Abrir el popup después de un pequeño retraso para que se sincronice con el vuelo
            setTimeout(() => {
                markers[post.id].openPopup();
            }, 1200);

            // Scroll automático para mostrar el mapa completo en la vista
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        listContainer.appendChild(postItem);
    }

    cargarPostsAprobados();
})();