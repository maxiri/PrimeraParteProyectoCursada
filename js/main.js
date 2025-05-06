// --------- Mapeo de Categorías y Subcategorías ---------
const categoriaPrefix = {
  "Juguetes Espaciales": "ESP",
  "Deco Infantil Cósmico": "DEC",
  "Figuras y Personajes": "FIG",
  "Tecnología y Robótica": "TEC",
  "Juegos Interactivos": "INT",
  "Juegos de mesa y rompecabezas": "ROM",
  "Creatividad y Educación": "CRE",
  "Juguetes Educativos / Científicos": "EDU",
  "Libros y cuentos": "LIB",
  "Otros": "OTR",
  "Accesorios y merchandising": "ACC"
};

const contadorIds = {};

function generarIdCategoria(categoria, subcategoria) {
  const cat = categoriaPrefix[categoria] || "GEN";
  const sub = categoriaPrefix[subcategoria] || "GEN";
  const key = `${cat}-${sub}`;
  contadorIds[key] = (contadorIds[key] || 0) + 1;
  return `${key}-${String(contadorIds[key]).padStart(3, '0')}`;
}

// --------- Productos Iniciales ---------
const productosIniciales = [
  {
    nombre: "Osito de peluche",
    descripcion: "Suave y abrazable para todas las edades.",
    precio: 15.99,
    imagen: "https://via.placeholder.com/150?text=Osito",
    categoria: "Creatividad y Educación",
    subcategoria: "Libros y cuentos",
    stock: 10
  },
  {
    nombre: "Carrito de niño",
    descripcion: "Ideal para los más pequeños.",
    precio: 25.50,
    imagen: "https://via.placeholder.com/150?text=Carrito",
    categoria: "Juguetes Espaciales",
    subcategoria: "Deco Infantil Cósmico",
    stock: 5
  },
  {
    nombre: "Guantes de boxeo",
    descripcion: "Para pequeños campeones.",
    precio: 30.00,
    imagen: "https://via.placeholder.com/150?text=Guantes",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos Interactivos",
    stock: 8
  },
  {
    nombre: "Pelota",
    descripcion: "Perfecta para jugar en el parque.",
    precio: 12.99,
    imagen: "https://via.placeholder.com/150?text=Pelota",
    categoria: "Otros",
    subcategoria: "Accesorios y merchandising",
    stock: 20
  },
  {
    nombre: "Buzz Light Year",
    descripcion: "¡Hasta el infinito y más allá!",
    precio: 45.00,
    imagen: "https://via.placeholder.com/150?text=Buzz",
    categoria: "Juguetes Espaciales",
    subcategoria: "Figuras y Personajes",
    stock: 7
  },
  {
    nombre: "Muñeca",
    descripcion: "Compañera de juegos perfecta.",
    precio: 18.75,
    imagen: "https://via.placeholder.com/150?text=Muñeca",
    categoria: "Juguetes Espaciales",
    subcategoria: "Figuras y Personajes",
    stock: 9
  },
  {
    nombre: "Puzzle",
    descripcion: "Desafía tu mente.",
    precio: 9.50,
    imagen: "https://via.placeholder.com/150?text=Puzzle",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos de mesa y rompecabezas",
    stock: 12
  },
  {
    nombre: "Cartas Pokémon",
    descripcion: "Colecciona y juega.",
    precio: 22.00,
    imagen: "https://via.placeholder.com/150?text=Cartas",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos de mesa y rompecabezas",
    stock: 15
  },
  {
    nombre: "Cocina de Juguete",
    descripcion: "Pequeños chefs en acción.",
    precio: 55.00,
    imagen: "https://via.placeholder.com/150?text=Cocina",
    categoria: "Creatividad y Educación",
    subcategoria: "Juguetes Educativos / Científicos",
    stock: 6
  },
  {
    nombre: "Casa de Muñecas",
    descripcion: "Sueños en miniatura.",
    precio: 65.99,
    imagen: "https://via.placeholder.com/150?text=Casa",
    categoria: "Creatividad y Educación",
    subcategoria: "Libros y cuentos",
    stock: 4
  }
].map(producto => ({
  ...producto,
  id: generarIdCategoria(producto.categoria, producto.subcategoria)
}));

function inicializarProductosBase() {
  let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

  const productosCombinados = [
    ...productosIniciales,
    ...productosGuardados.filter(
      prod => !productosIniciales.some(p => p.id === prod.id)
    )
  ];

  localStorage.setItem("productos", JSON.stringify(productosCombinados));
}

// --------- Modo Oscuro ---------
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");

  // También aplicar clase a elementos clave
  document.querySelector("header")?.classList.toggle("dark-mode", isDark);
  document.querySelector("nav")?.classList.toggle("dark-mode", isDark);
  document.querySelector("footer")?.classList.toggle("dark-mode", isDark);

  localStorage.setItem("dark-mode", isDark);
}

document.addEventListener("DOMContentLoaded", () => {
  const isDark = JSON.parse(localStorage.getItem("dark-mode"));
  if (isDark) {
    document.body.classList.add("dark-mode");
    document.querySelector("header")?.classList.add("dark-mode");
    document.querySelector("nav")?.classList.add("dark-mode");
    document.querySelector("footer")?.classList.add("dark-mode");
  }



  const logo = document.getElementById("logo");
  if (logo) logo.addEventListener("click", () => window.location.href = "index.html");

  inicializarProductosBase();
  cargarProductosGuardados();
  actualizarContadorCarrito();
});

// ---------- Funciones de Producto ----------
function guardarProducto(producto) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  if (!producto.id) {
    producto.id = generarIdCategoria(producto.categoria, producto.subcategoria);
  }

  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductosGuardados() {
  const contenedor = document.getElementById("productList") || document.getElementById("contenedor-productos");
  if (!contenedor) return;

  contenedor.innerHTML = ""; // limpiar antes de cargar
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.forEach(producto => agregarProductoAlDom(producto));
}

function agregarProductoAlDom(producto) {
  const contenedor = document.getElementById("productList") || document.getElementById("contenedor-productos");
  if (!contenedor) return;

  const card = document.createElement("div");
  card.classList.add("producto-item", "product-card");

  card.innerHTML = `
    <div class="product-image">
      <img src="${producto.imagen}" alt="${producto.nombre}" />
    </div>
    <div class="product-info">
      <h3 class="product-title">${producto.nombre}</h3>
      <p class="product-description"><strong>Descripción:</strong> ${producto.descripcion}</p>
      <p class="product-price"><strong>Precio:</strong> $${producto.precio}</p>
      <p><strong>Stock:</strong> ${producto.stock}</p>
      <p><strong>ID:</strong> ${producto.id}</p>
      <button class="add-to-cart">Añadir al carrito</button>
    </div>
  `;

  const addToCartButton = card.querySelector(".add-to-cart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
  }

  contenedor.appendChild(card);
}

function eliminarProductoPorId(id) {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) {
    alert(`❌ No se encontró ningún producto con el ID ${id}.`);
    return;
  }

  if (!confirm(`¿Seguro que querés eliminar el producto con ID ${id}?`)) {
    alert("✅ Eliminación cancelada.");
    return;
  }

  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  cargarProductosGuardados();
  alert(`✅ Producto con ID ${id} eliminado.`);
}

function actualizarStockProducto(id, nuevoStock) {
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    alert(`❌ No se encontró el producto con ID ${id}.`);
    return;
  }

  productos[index].stock = nuevoStock;
  localStorage.setItem("productos", JSON.stringify(productos));
  cargarProductosGuardados();
  alert(`✅ Stock actualizado para el producto con ID ${id}.`);
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const productoExistente = carrito.find(item => item.id === producto.id);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert(`🛒 ${producto.nombre} agregado al carrito`);
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById("cart-count");
  if (contador) contador.textContent = total;
}

// ----------- Búsqueda de Productos sin <mark> ----------
const searchInput = document.querySelector('.search-form input');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    filtrarYMostrarProductos(query);
  });
}

function filtrarYMostrarProductos(query) {
  const contenedor = document.getElementById("productList") || document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  productos
    .filter(p => p.nombre.toLowerCase().includes(query))
    .forEach(producto => agregarProductoAlDom(producto));
}
