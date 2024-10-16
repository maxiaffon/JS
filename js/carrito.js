// Mostrar el contenido del carrito
function mostrarContenidoCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tbody = document.querySelector('#carritoOffcanvas tbody');
    tbody.innerHTML = ''; 

    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>${item.cantidad}</td>
            <td>$${subtotal}</td>
            <td><button class="btn btn-danger eliminar-btn" data-id="${item.id}">Eliminar</button></td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Mostrar el carrito al abrir el offcanvas
document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector('#carritoOffcanvas').addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-btn')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            eliminarDelCarrito(id);
        }
    });

    
    document.querySelector('[data-bs-toggle="offcanvas"]').addEventListener('click', () => {
        mostrarContenidoCarrito();
    });
});

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    mostrarContenidoCarrito(); 
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');  
    mostrarContenidoCarrito();           
    alert("El carrito ha sido vaciado.");}


//finalizar compra
    const botonFinalizarCompra = document.getElementById('finalizarCompra');
    
   
    if (botonFinalizarCompra) {
        botonFinalizarCompra.addEventListener('click', finalizarCompra);
    }

    function finalizarCompra() {
        
        localStorage.removeItem('carrito');
        mostrarContenidoCarrito();
        
        Toastify({
            text: "¡Gracias por tu compra! El carrito ha sido vaciado.",
            duration: 3000, 
            close: true, 
            gravity: "top", 
            position: 'right',
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", 
        }).showToast();
    }

// Cerrar el carrito
function cerrarCarrito() {
    const offcanvas = document.getElementById('carritoOffcanvas');
    offcanvas.classList.remove('show');
}



