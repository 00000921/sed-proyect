document.addEventListener('DOMContentLoaded', () => {  
    document.getElementById('loginForm').addEventListener('submit', loginUser);  
});  

function loginUser(event) {  
    event.preventDefault(); // Evitar el envío del formulario por defecto  

    const username = document.getElementById('username').value;  
    const password = document.getElementById('password').value;  

    fetch('http://localhost:3000/login', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ username, password })  
    })  
    .then(response => response.json())  
    .then(data => {  
        if (data.success) {  
            localStorage.setItem('authToken', data.token); // Guardar el token en localStorage  
            window.location.href = 'dashboard.html'; // Redirigir al dashboard  
        } else {  
            alert(data.message); // Mostrar mensaje de error  
        }  
    })  
    .catch(error => console.error('Error during login:', error));  
}