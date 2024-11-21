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

            console.log(data);  

            if (data.data && data.data.suppliers) {  
                data.data.suppliers.forEach(supplier => {  
                    const row = document.createElement('tr');  
                    row.innerHTML = `  
                        <td>${supplier.id}</td>  
                        <td>${supplier.company_name}</td>   
                    `;  
                    suppliersTableBody.appendChild(row);  
                });  
            } else {  
                console.error('No suppliers found in the response');  
            }  
        })  
        .catch(error => console.error('Error loading suppliers:', error));  
}  

function addSupplier(event) {  
    event.preventDefault();  
    const companyName = document.getElementById('companyName').value;  

    fetch('http://localhost:3000/suppliers', {  
        method: 'POST',  
        headers: {   
            'Content-Type': 'application/json',   
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`   
        },  
        body: JSON.stringify({ companyName: companyName })  
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

            if (data && Array.isArray(data)) {  
                data.forEach(supplier => {  
                    const row = document.createElement('tr');  
                    row.innerHTML = `  
                        <td>${supplier.id}</td>  
                        <td>${supplier.company_name}</td>  
                    `;  
                    suppliersTableBody.appendChild(row);  
                });  
            } else {  
                console.error('No suppliers found in the response');  
            }  
        })  
        .catch(error => console.error('Error searching supplier:', error));  
}