document.addEventListener('DOMContentLoaded', () => {  
    loadSuppliers();  
    document.getElementById('addSupplierForm').addEventListener('submit', addSupplier);  
    document.getElementById('searchSupplierBtn').addEventListener('click', searchSupplier);  
});  

function loadSuppliers() {  
    fetch('http://localhost:3000/suppliers') // Cambia la URL según tu API  
        .then(response => response.json())  
        .then(data => {  
            const suppliersTableBody = document.getElementById('suppliersTable').querySelector('tbody');  
            suppliersTableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos  

            data.forEach(supplier => {  
                const row = document.createElement('tr');  
                row.innerHTML = `  
                    <td>${supplier.id}</td>  
                    <td>${supplier.name}</td>  
                    <td>${supplier.contact}</td>  
                    <td>${supplier.email}</td>  
                `;  
                suppliersTableBody.appendChild(row);  
            });  
        })  
        .catch(error => console.error('Error loading suppliers:', error));  
}  

function addSupplier(event) {  
    event.preventDefault();  
    const supplierName = document.getElementById('supplierName').value;  
    const supplierContact = document.getElementById('supplierContact').value;  
    const supplierEmail = document.getElementById('supplierEmail').value;  

    fetch('http://localhost:3000/suppliers', {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({ name: supplierName, contact: supplierContact, email: supplierEmail })  
    })  
    .then(response => response.json())  
    .then(data => {  
        console.log(data.message); // Mensaje de éxito  
        loadSuppliers(); // Recargar proveedores  
    })  
    .catch(error => console.error('Error adding supplier:', error));  
}  

function searchSupplier() {  
    const searchName = document.getElementById('searchSupplier').value;  

    fetch(`http://localhost:3000/suppliers?name=${searchName}`) // Cambia la URL según tu API  
        .then(response => response.json())  
        .then(data => {  
            const suppliersTableBody = document.getElementById('suppliersTable').querySelector('tbody');  
            suppliersTableBody.innerHTML = ''; // Limpiar tabla antes de agregar datos  

            data.forEach(supplier => {  
                const row = document.createElement('tr');  
                row.innerHTML = `  
                    <td>${supplier.id}</td>  
                    <td>${supplier.name}</td>  
                    <td>${supplier.contact}</td>  
                    <td>${supplier.email}</td>  
                `;  
                suppliersTableBody.appendChild(row);  
            });  
        })  
        .catch(error => console.error('Error searching supplier:', error));  
}