let productos = []; 

// Cargar productos desde un archivo JSON utilizando fetch
function cargarProductosDesdeJSON() {
    fetch('../json/productos.json')  
        .then(response => {
            if (!response.ok) {  
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();  
        })
        .then(data => {
            productos = data;  
            mostrarProductos(); 
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}


function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';  

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto', 'card', 'mb-3');
        div.innerHTML = `
            <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    Toastify({
        text: `¡${producto.nombre} ha sido agregado al carrito!`,
        duration: 3000,  
        close: true,      
        gravity: "top",   
        position: "right", 
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
}


document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDesdeJSON();  

    // Evento para agregar productos al carrito
    document.getElementById('productos').addEventListener('click', (e) => {
        if (e.target.classList.contains('agregar-carrito')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        }
    });
});
