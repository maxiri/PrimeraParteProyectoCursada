

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

      cart.push({ title, price, image });

      localStorage.setItem('carrito', JSON.stringify(cart));
      cartCount.textContent = cart.length;
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
if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener('click', () => {
    cart = [];
    localStorage.setItem('carrito', JSON.stringify(cart));
    renderizarCarrito();
  });
}

// Finalizar compra
if (finalizarCompraBtn) {
  finalizarCompraBtn.addEventListener('click', () => {
    alert('¡Gracias por tu compra! 🛍️');
    cart = [];
    localStorage.setItem('carrito', JSON.stringify(cart));
    renderizarCarrito();
  });
}

// Inicializar
renderizarCarrito();

