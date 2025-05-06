document.addEventListener('DOMContentLoaded', function () {
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('carrito')) || [];

// Contador del carrito
const cartCount = document.getElementById('cart-count');

// SOLO si hay botones "add-to-cart", agregar eventos
const addToCartButtons = document.querySelectorAll('.add-to-cart');
if (addToCartButtons.length > 0) {
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const title = productCard.querySelector('.product-title').textContent;
      const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
      const image = productCard.querySelector('.product-image img')?.getAttribute('src') || 'assets/images/placeholder.png';

      const product = { title, price, image, cantidad: 1 };

      // Verificar si el producto ya está en el carrito
      const existingProductIndex = cart.findIndex(p => p.title === product.title);
      if (existingProductIndex !== -1) {
        // Si ya existe, aumentar la cantidad
        cart[existingProductIndex].cantidad += 1;
      } else {
        // Si no existe, agregarlo al carrito
        cart.push(product);
      }

      // Guardar en localStorage
      localStorage.setItem('carrito', JSON.stringify(cart));

      // Actualizar el contador del carrito
      cartCount.textContent = cart.reduce((total, item) => total + item.cantidad, 0);

      console.log(cart);
    });
  });
}

// Resto de tu código para renderizar carrito
const carritoProductos = document.getElementById('carrito-productos');
const carritoTotal = document.getElementById('carrito-total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

// Renderizar carrito
function renderizarCarrito() {
  carritoProductos.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    carritoProductos.innerHTML = '<p>Tu carrito está vacío.</p>';
  } else {
    cart.forEach(producto => {
      if (!producto) return;

      const precio = producto.price ?? producto.precio;
      if (typeof precio !== 'number') return;

      const item = document.createElement('div');
      item.className = 'carrito-item';
      item.innerHTML = `
        <img src="${producto.image || producto.imagen}" alt="${producto.title || producto.nombre}" class="carrito-img">
        <div class="carrito-info">
          <h3>${producto.title || producto.nombre}</h3>
          <p>Precio: $${precio.toFixed(2)}</p>
          <p>Cantidad: ${producto.cantidad}</p>
        </div>
      `;
      carritoProductos.appendChild(item);
      total += precio * producto.cantidad;
    });
  }

  carritoTotal.textContent = total.toFixed(2);
}

// Vaciar carrito
if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener('click', () => {
    cart = [];
    localStorage.setItem('carrito', JSON.stringify(cart));
    renderizarCarrito();
    // Actualizar el contador del carrito
    cartCount.textContent = 0;
  });
}

// Finalizar compra
if (finalizarCompraBtn) {
  finalizarCompraBtn.addEventListener('click', () => {
    alert('¡Gracias por tu compra! 🛍️');
    cart = [];
    localStorage.setItem('carrito', JSON.stringify(cart));
    renderizarCarrito();
    // Actualizar el contador del carrito
    cartCount.textContent = 0;
  });
}

// Inicializar
renderizarCarrito();

// Actualizar contador de productos en el carrito al cargar la página
cartCount.textContent = cart.reduce((total, item) => total + item.cantidad, 0);

