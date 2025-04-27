// --------- Modo Oscuro ---------

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");
  localStorage.setItem("dark-mode", isDark);
}

// Aplica modo oscuro si ya estaba activado antes
document.addEventListener("DOMContentLoaded", () => {
  const isDark = JSON.parse(localStorage.getItem("dark-mode"));
  if (isDark) {
    document.body.classList.add("dark-mode");
  }

  // Si hay botón para modo oscuro, agregar evento
  const darkModeButton = document.querySelector(".test-scss-button") || document.getElementById("toggle-dark");
  if (darkModeButton) {
    darkModeButton.addEventListener("click", toggleDarkMode);
  }
});


// --------- Logo clickeable ---------

document.addEventListener('DOMContentLoaded', function () {
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});


// --------- Formularios Admin (Alta, Bajas, Stock) ---------

document.addEventListener('DOMContentLoaded', () => {

  // Agregar producto
  const addProductForm = document.getElementById('addProductForm');
  if (addProductForm) {
    addProductForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(event.target);

      fetch('/api/agregar-producto', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        alert('Producto agregado correctamente');
        event.target.reset();
      })
      .catch(error => {
        alert('Hubo un error al agregar el producto');
        console.error(error);
      });
    });
  }

  // Eliminar producto
  const deleteProductForm = document.getElementById('deleteProductForm');
  if (deleteProductForm) {
    deleteProductForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const productId = document.getElementById('productId').value;

      fetch(`/api/eliminar-producto/${productId}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        alert('Producto eliminado correctamente');
        event.target.reset();
      })
      .catch(error => {
        alert('Hubo un error al eliminar el producto');
        console.error(error);
      });
    });
  }

  // Actualizar stock
  const updateStockForm = document.getElementById('updateStockForm');
  if (updateStockForm) {
    updateStockForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const productId = document.getElementById('productIdStock').value;
      const newStock = document.getElementById('newStock').value;

      fetch(`/api/actualizar-stock/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock: newStock })
      })
      .then(response => response.json())
      .then(data => {
        alert('Stock actualizado correctamente');
        event.target.reset();
      })
      .catch(error => {
        alert('Hubo un error al actualizar el stock');
        console.error(error);
      });
    });
  }

});



// --------- Modal de Acceso (si existe) ---------

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-acceso');
  const inputCodigo = document.getElementById('input-codigo');
  const btnValidar = document.getElementById('btn-validar-codigo');

  if (modal && inputCodigo && btnValidar) {
    const codigoCorrecto = "cosmica123";

    modal.style.display = "flex"; // Muestra el modal apenas carga

    btnValidar.addEventListener('click', () => {
      if (inputCodigo.value === codigoCorrecto) {
        modal.style.display = "none"; // Oculta el modal si el código es correcto
      } else {
        alert("🚫 Código incorrecto. Redirigiendo al inicio...");
        window.location.href = "index.html";
      }
    });

    inputCodigo.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        btnValidar.click(); // Simula hacer clic en el botón
      }
    });
  }
});


// Carrito de compras
let cart = JSON.parse(localStorage.getItem('carrito')) || []; // Cargar carrito del LocalStorage

// Contador del carrito en el header
const cartCount = document.getElementById('cart-count');

// Botones "Añadir al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Elementos del carrito
const carritoProductos = document.getElementById('carrito-productos');
const carritoTotal = document.getElementById('carrito-total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

// Evento al hacer clic en "Añadir al carrito"
addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const title = productCard.querySelector('.product-title').textContent;
    const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '')); // Eliminar signo $ y convertir a número
    const image = productCard.querySelector('.product-image img').src; // Obtener la imagen

    // Agregar el producto al carrito
    cart.push({
      title,
      price,
      image
    });

    // Actualizar el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(cart));

    // Actualizar el número en el carrito (en el header)
    cartCount.textContent = cart.length;

    console.log(cart); // Para ver en la consola el contenido del carrito
  });
});

// Función para renderizar el carrito
function renderizarCarrito() {
  carritoProductos.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    carritoProductos.innerHTML = '<p>Tu carrito está vacío.</p>';
  } else {
    cart.forEach(producto => {
      const item = document.createElement('div');
      item.className = 'carrito-item';
      item.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}" class="carrito-img">
        <div class="carrito-info">
          <h3>${producto.title}</h3>
          <p>Precio: $${producto.price.toFixed(2)}</p>
        </div>
      `;
      carritoProductos.appendChild(item);
      total += producto.price;
    });
  }

  carritoTotal.textContent = total.toFixed(2);
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
  cart = [];
  localStorage.setItem('carrito', JSON.stringify(cart));
  renderizarCarrito();
});

// Finalizar compra
finalizarCompraBtn.addEventListener('click', () => {
  alert('¡Gracias por tu compra! 🛍️');
  cart = [];
  localStorage.setItem('carrito', JSON.stringify(cart));
  renderizarCarrito();
});

// Inicializar el carrito al cargar la página
renderizarCarrito();

