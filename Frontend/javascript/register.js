document.addEventListener('DOMContentLoaded', () => {  
    document.getElementById('registerButton').addEventListener('click', registerUser);  
});  

function registerUser() {  
    const username = document.getElementById('username').value;  
    const firstname = document.getElementById('firstname').value;  
    const lastname = document.getElementById('lastname').value;  
    const email = document.getElementById('email').value;  
    const password = document.getElementById('password').value;  

    // Validar que todos los campos estén llenos  
    const inputs = document.querySelectorAll('.register-form input');  
    let allFieldsFilled = true;  

    inputs.forEach(input => {  
        if (!input.value.trim()) {  
            allFieldsFilled = false;  
            input.style.border = "2px solid red";  
        } else {  
            input.style.border = "1px solid #ddd";  
        }  
    });  

    if (!allFieldsFilled) {  
        alert("Por favor, llena todos los campos.");  
        return;  
    }  

    fetch('http://localhost:3000/register', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ username, firstname, lastname, email, password })  
    })  
    .then(response => response.json())  
    .then(data => {  
        if (data.success) {  
            alert('Registro exitoso. Ahora puedes iniciar sesión.');  
            window.location.href = 'login.html'; // Redirigir al login  
        } else {  
            alert(data.message); // Mostrar mensaje de error  
        }  
    })  
    .catch(error => console.error('Error during registration:', error));  
}