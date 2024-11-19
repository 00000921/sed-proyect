document.addEventListener('DOMContentLoaded', () => {  
    loadInventory();  
    document.getElementById('addInventoryForm').addEventListener('submit', addInventory);  
    document.getElementById('searchInventoryBtn').addEventListener('click', searchInventory);  
});  

function loadInventory() {  
    fetch('http://localhost:3000/inventory') // Cambia la URL según tu API  
        .then(response => response.json())  
        .then(data => {  
            const inventoryTableBody = document.getElementById('inventoryTable').querySelector('tbody');  
            inventoryTableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos  

            data.forEach(item => {  
                const row = document.createElement('tr');  
                row.innerHTML = `  
                    <td>${item.id}</td>  
                    <td>${item.name}</td>  
                    <td>${item.quantity}</td>  
                `;  
                inventoryTableBody.appendChild(row);  
            });  
        })  
        .catch(error => console.error('Error loading inventory:', error));  
}  

function addInventory(event) {  
    event.preventDefault();  
    const productName = document.getElementById('productName').value;  
    const quantity = document.getElementById('quantity').value;  

    fetch('http://localhost:3000/inventory', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ name: productName, quantity: quantity })  
    })  
    .then(response => response.json())  
    .then(data => {  
        console.log(data.message); // Mensaje de éxito  
        loadInventory(); // Recargar inventario  
    })  
    .catch(error => console.error('Error adding inventory:', error));  
}  

function searchInventory() {  
    const searchId = document.getElementById('searchInventory').value;  

    fetch(`http://localhost:3000/inventory/${searchId}`) // Cambia la URL según tu API  
        .then(response => response.json())  
        .then(data => {  
            const inventoryTableBody = document.getElementById('inventoryTable').querySelector('tbody');  
            inventoryTableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos  

            const row = document.createElement('tr');  
            row.innerHTML = `  
                <td>${data.id}</td>  
                <td>${data.name}</td>  
                <td>${data.quantity}</td>  
            `;  
            inventoryTableBody.appendChild(row);  
        })  
        .catch(error => console.error('Error searching inventory:', error));  
}