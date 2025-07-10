
async function checkUser() {
    const token = localStorage.getItem("token"); 
    const navLinks = document.getElementById("nav-links");
    // Limpiar contenido previo 
    navLinks.innerHTML = ""; 

    // Usuario no autenticado 
    if (!token) { 
        navLinks.innerHTML = `
            <a href="/login.html" class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition">Iniciar sesión</a>
            <a href="/register.html" class="bg-emerald-400 hover:bg-emerald-600 text-white px-3 py-1 rounded transition">Registrarse</a>
        `;
        return; 
    } 
    
    try {
        const response = await fetch("http://localhost:8002/api/auth/me", { 
            method: "GET", 
            headers: { 
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Token inválido");

        // Usuario autenticado 
        const data = await response.json();
        const username = data.username || "Usuario";

        navLinks.innerHTML = `
            <span class="text-gray-100 font-bold">Hola, ${username}</span>
            ${data.is_admin
                ? `<a href="/admin.html" class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition">Administrar</a>`
                : `<a href="/profile.html" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition">Perfil</a>`
            }
            <button onclick="logout()" class="bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded transition">Cerrar sesión</button>
        `;
    
    } catch (err) { 
        console.warn("Token inválido o expirado. Eliminando...", err); 
        localStorage.removeItem("token"); 
        // volver a cargar como no autenticado 
        checkUser(); 
    }
} 

function logout() { 
    localStorage.removeItem("token"); 
    window.location.reload(); // o redirige a index 
}
 
// Ejecutar al cargar la página 
document.addEventListener("DOMContentLoaded", checkUser);