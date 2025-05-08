document.addEventListener("DOMContentLoaded", () => {
  aplicarModoOscuro();
  actualizarContadorCarrito();

  const params = new URLSearchParams(window.location.search);
  const categoriaSeleccionada = params.get("categoria");

  const categoriaNombreMap = {
    "ESP": "🚀 Juguetes Espaciales",
    "ESP-DEC": "🛏️ Deco Infantil Cósmico",
    "ESP-FIG": "👾 Figuras y Personajes",
    "TEC": "🤖 Tecnología y Robótica",
    "TEC-INT": "🎮 Juegos Interactivos",
    "TEC-ROM": "🧩 Juegos de mesa y rompecabezas",
    "CRE": "🎨 Creatividad y Educación",
    "CRE-EDU": "🧪 Juguetes Educativos / Científicos",
    "CRE-LIB": "📚 Libros y cuentos",
    "OTR": "🧑‍🚀 Otros",
    "OTR-ACC": "🧑‍🚀 Accesorios y merchandising"
  };

  const titulo = document.getElementById("category-title");
  titulo.textContent = categoriaNombreMap[categoriaSeleccionada] || "Categoría desconocida";

  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  const productosFiltrados = productos.filter(producto =>
    typeof producto.id === "string" && producto.id.startsWith(categoriaSeleccionada)
  );

  if (productosFiltrados.length === 0) {
    console.warn(`⚠️ No se encontraron productos para la categoría: ${categoriaSeleccionada}`);
  }

  mostrarProductos(productosFiltrados);
});

function mostrarProductos(lista) {
  const contenedor = document.getElementById("productList");
  const template = document.getElementById("card-template");
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = `<p>No se encontraron productos.</p>`;
    return;
  }

  lista.forEach(producto => {
    const clon = template.content.cloneNode(true);
    clon.querySelector(".nombre").textContent = producto.nombre;
    clon.querySelector(".imagen").src = producto.imagen;
    clon.querySelector(".imagen").alt = producto.nombre;
    clon.querySelector(".precio").textContent = `$${producto.precio.toFixed(2)}`;
    clon.querySelector(".descripcion").textContent = producto.descripcion;
    clon.querySelector(".stock").textContent = `Stock: ${producto.stock}`;

    const boton = clon.querySelector(".add-to-cart");
    boton.addEventListener("click", () => agregarAlCarrito(producto));

    contenedor.appendChild(clon);
  });
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existente = carrito.find(p => p.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert(`🛒 ${producto.nombre} agregado al carrito`);
}

function aplicarModoOscuro() {
  const isDark = JSON.parse(localStorage.getItem("dark-mode"));
  if (isDark) {
    document.body.classList.add("dark-mode");
    document.querySelector("header")?.classList.add("dark-mode");
    document.querySelector("nav")?.classList.add("dark-mode");
    document.querySelector("footer")?.classList.add("dark-mode");
  }
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById("cart-count");
  if (contador) contador.textContent = total;
}

const logo = document.getElementById("logo");
if (logo) logo.addEventListener("click", () => window.location.href = "index.html");
