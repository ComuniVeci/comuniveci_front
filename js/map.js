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
        });
    } catch (err) {
        console.error("Error al cargar los posts aprobados:", err);
        alert("No se pudieron cargar los posts aprobados desde el mapa.");
    }
}

cargarPostsAprobados();
