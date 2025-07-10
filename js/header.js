
async function checkUser() {
    const token = localStorage.getItem("token"); 
    const navLinks = document.getElementById("nav-links");
    // Limpiar contenido previo 
    navLinks.innerHTML = ""; 

    // Usuario no autenticado 
    if (!token) { 
        navLinks.innerHTML = `
            <a href="/login.html" class="text-blue-600 hover:underline">Iniciar sesión</a>
            <a href="/register.html" class="text-blue-600 hover:underline">Registrarse</a>
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
            <span class="text-gray-700">Hola, ${username}</span>
            ${data.is_admin
                ? `<a href="/admin.html" class="text-blue-600 hover:underline">Administrar</a>`
                : `<a href="/profile.html" class="text-blue-600 hover:underline">Perfil</a>`
            }
            <button onclick="logout()" class="text-red-600 hover:underline">Cerrar sesión</button>
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