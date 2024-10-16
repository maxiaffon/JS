// Lista de productos
const productos = [
    { id: 1, nombre: "Fotos", precio: 7000, img: "../img/fotos.jpg" },
    { id: 2, nombre: "Desayuno", precio: 12000, img: "../img/desayuno.jpg" },
    { id: 3, nombre: "Cuadro", precio: 9000, img: "../img/cuadro4fotos.jpg" },
    { id: 4, nombre: "Fotos imantadas", precio: 15000, img: "../img/imagenesimantadas.jpg" },
    { id: 5, nombre: "Álbum de figuritas", precio: 9000, img: "../img/albundefiguritas.jpg" },
    { id: 6, nombre: "Fotos Spotify", precio: 7500, img: "../img/fotosspotify.jpg" },
];

// Cargar productos en la página
function cargarProductos() {
    const contenedor = document.getElementById('productos');
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

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();

    document.getElementById('productos').addEventListener('click', (e) => {
        if (e.target.classList.contains('agregar-carrito')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        }
    });
});
