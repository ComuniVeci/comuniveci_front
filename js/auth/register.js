(function() {
    document.getElementById("register-form").addEventListener("submit", async function (e) { 
        e.preventDefault(); 
        const username = document.getElementById("username").value; 
        const email = document.getElementById("email").value; 
        const password = document.getElementById("password").value;
        const res = await fetch("http://localhost:8002/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.access_token); // login automático
            window.location.href = "/index.html";
        } else {
            alert("Error en el registro");
        }
    });
})();