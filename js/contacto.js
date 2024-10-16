document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que se recargue la página

    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    
    if (nombre && email && asunto && mensaje) {
      
      Toastify({
        text: `Mensaje enviado con éxito por ${nombre} - ${asunto}`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(135deg, #00c6ff, #0072ff)", 
        stopOnFocus: true,
      }).showToast();
      
      
      document.getElementById('contactForm').reset();
    } else {
      
      Toastify({
        text: "Por favor, completa todos los campos",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(135deg, #ff5f6d, #ffc3a0)", 
        stopOnFocus: true,
      }).showToast();
    }
  });