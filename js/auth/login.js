(function() {
    document.getElementById("login-form").addEventListener("submit", async function (e) { 
        e.preventDefault(); const email = document.getElementById("email").value; 
        const password = document.getElementById("password").value;

        const res = await fetch("http://localhost:8002/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.access_token);
            window.location.href = "/index.html";
        } else {
            alert("Correo o contraseña incorrectos");
        }
    });
})();