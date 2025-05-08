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

// Generar ID solo si no viene uno definido
function generarIdCategoria(categoria, subcategoria) {
  const cat = categoriaPrefix[categoria] || "GEN";
  const sub = categoriaPrefix[subcategoria] || "GEN";
  const key = `${cat}-${sub}`;
  contadorIds[key] = (contadorIds[key] || 0) + 1;
  return `${key}-${String(contadorIds[key]).padStart(3, '3')}`;
}


// --------- Productos Iniciales ---------
const productosIniciales = [
  {
    id: generarIdCategoria("Juguetes Espaciales", "Deco Infantil Cósmico"),
    nombre: "Cortina Galáctica",
    descripcion: "Cortina decorativa con planetas y estrellas para habitaciones infantiles.",
    precio: 29.99,
    imagen: "assets/images/Img-Productos/f82d293f-4c99-408b-8b94-431220e0dde0.webp",
    categoria: "Juguetes Espaciales",
    subcategoria: "Deco Infantil Cósmico",
    stock: 8
  },
  {
    id: generarIdCategoria("Juguetes Espaciales", "Figuras y Personajes"),
    nombre: "Astronauta articulado",
    descripcion: "Figura articulada con casco removible y mochila espacial.",
    precio: 21.99,
    imagen: "assets/images/Img-Productos/D_NQ_NP_770983-MLA76187517415_052024-O.webp",
    categoria: "Juguetes Espaciales",
    subcategoria: "Figuras y Personajes",
    stock: 10
  },
  {
    id: generarIdCategoria("Tecnología y Robótica", "Juegos Interactivos"),
    nombre: "Lápiz Digital Parlante",
    descripcion: "Interfaz educativa parlante que enseña letras y números.",
    precio: 19.50,
    imagen: "assets/images/Img-Productos/D_NQ_NP_942244-MLU78616055332_082024-O.webp",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos Interactivos",
    stock: 9
  },
  {
    id: generarIdCategoria("Creatividad y Educación", "Juguetes Educativos / Científicos"),
    nombre: "Set de Imantación",
    descripcion: "Juego para experimentar con magnetismo y repulsión.",
    precio: 16.45,
    imagen: "assets/images/Img-Productos/D_NQ_NP_942244-MLU78616055332_082024-O.webp",
    categoria: "Creatividad y Educación",
    subcategoria: "Juguetes Educativos / Científicos",
    stock: 11
  },
  {
    id: generarIdCategoria("Otros", "Accesorios y merchandising"),
    nombre: "Llaveros Espaciales",
    descripcion: "Set de 3 llaveros con diseños de cohetes, planetas y astronautas.",
    precio: 9.99,
    imagen: "assets/images/Img-Productos/D_NQ_NP_620857-MLU74180599485_012024-O.webp",
    categoria: "Otros",
    subcategoria: "Accesorios y merchandising",
    stock: 20
  },
  {
    id: "CRE-LIB-001",
    nombre: "Osito de peluche",
    descripcion: "Suave y abrazable para todas las edades.",
    precio: 15.99,
    imagen: "assets/images/Img-Productos/oso-de-peluche-oso-de-peluche.jpg",
    categoria: "Creatividad y Educación",
    subcategoria: "Libros y cuentos",
    stock: 10
  },
  {
    id: "ESP-DEC-001",
    nombre: "Carrito de niño",
    descripcion: "Ideal para los más pequeños.",
    precio: 25.5,
    imagen: "assets/images/Img-Productos/81A25kwzSaL.jpg",
    categoria: "Juguetes Espaciales",
    subcategoria: "Deco Infantil Cósmico",
    stock: 5
  },
  {
    id: "TEC-INT-001",
    nombre: "Guantes de boxeo",
    descripcion: "Para pequeños campeones.",
    precio: 30.0,
    imagen: "assets/images/Img-Productos/images.jpeg",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos Interactivos",
    stock: 8
  },
  {
    id: "OTR-ACC-001",
    nombre: "Pelota",
    descripcion: "Perfecta para jugar en el parque.",
    precio: 12.99,
    imagen: "assets/images/Img-Productos/balon-cumbre-conmebol-libertadores-unisex-blanco.jpg",
    categoria: "Otros",
    subcategoria: "Accesorios y merchandising",
    stock: 20
  },
  {
    id: "ESP-FIG-001",
    nombre: "Buzz Light Year",
    descripcion: "¡Hasta el infinito y más allá!",
    precio: 45.0,
    imagen: "assets/images/Img-Productos/91rUF2n1kBL._AC_SL1500_.jpg",
    categoria: "Juguetes Espaciales",
    subcategoria: "Figuras y Personajes",
    stock: 7
  },
  {
    id: "ESP-FIG-002",
    nombre: "Muñeca",
    descripcion: "Compañera de juegos perfecta.",
    precio: 18.75,
    imagen: "assets/images/Img-Productos/images (1).jpeg",
    categoria: "Juguetes Espaciales",
    subcategoria: "Figuras y Personajes",
    stock: 9
  },
  {
    id: "TEC-ROM-002",
    nombre: "Cartas Pokémon",
    descripcion: "Colecciona y juega.",
    precio: 22.0,
    imagen: "assets/images/Img-Productos/D_NQ_NP_782068-MLU51839721316_102022-O.webp",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos de mesa y rompecabezas",
    stock: 15
  },
  {
    id: "CRE-EDU-001",
    nombre: "Cocina de Juguete",
    descripcion: "Pequeños chefs en acción.",
    precio: 55.0,
    imagen: "assets/images/Img-Productos/cocina-infantil-de-juguete-set-en-valija-con-31-accesorios-cocina-infantil-de-juguete-set-en-valija-con-31-accesorios.jpg",
    categoria: "Creatividad y Educación",
    subcategoria: "Juguetes Educativos / Científicos",
    stock: 6
  },
  {
    id: "ESP-DEC-002",
    nombre: "Lámpara de estrella",
    descripcion: "Producto de la línea deco infantil cósmico",
    precio: 36.81,
    imagen: "assets/images/Img-Productos/images (2).jpeg",
    categoria: "Juguetes Espaciales",
    subcategoria: "Deco Infantil Cósmico",
    stock: 19
  },
  {
    id: "ESP-DEC-003",
    nombre: "Vinilo planetario",
    descripcion: "Producto de la línea deco infantil cósmico",
    precio: 44.92,
    imagen: "assets/images/Img-Productos/vinilo-infantil-sistema-solar-1424.webp",
    categoria: "Juguetes Espaciales",
    subcategoria: "Deco Infantil Cósmico",
    stock: 5
  },
  {
    id: "TEC-INT-002",
    nombre: "Tablet educativa",
    descripcion: "Producto de la línea juegos interactivos",
    precio: 48.1,
    imagen: "assets/images/Img-Productos/67307039-tablero-de-instrumentos-viejo-soviética-vostok-de-la-nave-espacial.jpg",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos Interactivos",
    stock: 17
  },
  {
    id: "TEC-INT-003",
    nombre: "Robot programable",
    descripcion: "Producto de la línea juegos interactivos",
    precio: 58.66,
    imagen: "assets/images/Img-Productos/Robot Interactivo Parlante.webp",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos Interactivos",
    stock: 4
  },
  {
    id: "TEC-ROM-003",
    nombre: "Rompecabezas solar",
    descripcion: "Producto de la línea juegos de mesa y rompecabezas",
    precio: 44.33,
    imagen: "assets/images/Img-Productos/Rompecabezas solar.jpeg",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos de mesa y rompecabezas",
    stock: 6
  },
  {
    id: "CRE-EDU-002",
    nombre: "Kit de ciencia",
    descripcion: "Producto de la línea juguetes educativos / científicos",
    precio: 15.65,
    imagen: "assets/images/Img-Productos/Kit de ciencia.webp",
    categoria: "Creatividad y Educación",
    subcategoria: "Juguetes Educativos / Científicos",
    stock: 16
  },
  {
    id: "CRE-EDU-003",
    nombre: "Microscopio junior",
    descripcion: "Producto de la línea juguetes educativos / científicos",
    precio: 23.66,
    imagen: "assets/images/Img-Productos/Microscopio junior.jpeg",
    categoria: "Creatividad y Educación",
    subcategoria: "Juguetes Educativos / Científicos",
    stock: 11
  },
  {
    id: "CRE-LIB-003",
    nombre: "Cuento de astronautas",
    descripcion: "Producto de la línea libros y cuentos",
    precio: 19.36,
    imagen: "assets/images/Img-Productos/Cuento de astronautas.jpg",
    categoria: "Creatividad y Educación",
    subcategoria: "Libros y cuentos",
    stock: 7
  },
  {
    id: "OTR-ACC-002",
    nombre: "Mochila espacial",
    descripcion: "Producto de la línea accesorios y merchandising",
    precio: 12.91,
    imagen: "assets/images/Img-Productos/Mochila espacial.webp",
    categoria: "Otros",
    subcategoria: "Accesorios y merchandising",
    stock: 6
  },
  {
    id: "OTR-ACC-003",
    nombre: "Gorra cósmica",
    descripcion: "Producto de la línea accesorios y merchandising",
    precio: 30.17,
    imagen: "assets/images/Img-Productos/Gorra cósmica.jpg",
    categoria: "Otros",
    subcategoria: "Accesorios y merchandising",
    stock: 13
  }, {
    id: "ESP-DEC-001",
    nombre: "Almohada Astronauta",
    descripcion: "Almohada con forma de astronauta para decoración infantil.",
    precio: 15.99,
    imagen: "assets/images/Img-Productos/Almohada Astronauta.jpg",
    categoria: "Juguetes Espaciales",
    subcategoria: "Deco Infantil Cósmico",
    stock: 10
  },
  // ESP - Figuras
  {
    id: "ESP-FIG-001",
    nombre: "Figura Alienígena",
    descripcion: "Figura de vinilo de un alienígena amistoso.",
    precio: 12.50,
    imagen: "assets/images/Img-Productos/Figura-alienigena.webp",
    categoria: "Juguetes Espaciales",
    subcategoria: "Figuras y Personajes",
    stock: 8
  },
  // TEC - Juegos Interactivos
  {
    id: "TEC-JUE-001",
    nombre: "Robot Explorador",
    descripcion: "Robot programable para niños.",
    precio: 49.90,
    imagen: "assets/images/Img-Productos/Robot Explorador.webp",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos Interactivos",
    stock: 5
  },
  // TEC - Rompecabezas
  {
    id: "TEC-ROM-001",
    nombre: "Rompecabezas Espacial",
    descripcion: "Rompecabezas de 500 piezas con temática del sistema solar.",
    precio: 20.00,
    imagen: "assets/images/Img-Productos/P504424-1.webp",
    categoria: "Tecnología y Robótica",
    subcategoria: "Juegos de mesa y rompecabezas",
    stock: 12
  },
  // CRE - Científicos
  {
    id: "CRE-CIE-001",
    nombre: "Kit de Ciencia",
    descripcion: "Incluye tubos de ensayo, microscopio y más.",
    precio: 35.00,
    imagen: "assets/images/Img-Productos/D_NQ_NP_809324-MLU47382095355_092021-O.webp",
    categoria: "Creatividad y Educación",
    subcategoria: "Juguetes Educativos / Científicos",
    stock: 7
  },
  // CRE - Libros
  {
    id: "CRE-LIB-001",
    nombre: "Cuentos Cósmicos",
    descripcion: "Historias para dormir con temática espacial.",
    precio: 18.00,
    imagen: "assets/images/Img-Productos/Cuento de astronautas.jpg",
    categoria: "Creatividad y Educación",
    subcategoria: "Libros y cuentos",
    stock: 20
  },
  // OTR - Accesorios
 {
    id: "TEC-JUE-001",
    nombre: "Consola Retro Mini",
    descripcion: "Consola portátil con 400 juegos clásicos incluidos.",
    precio: 7999,
    stock: 15,
    imagen: "assets/images/Img-Productos/Consola Retro Mini.webp"
  },
  {
    id: "TEC-JUE-002",
    nombre: "Robot Interactivo Parlante",
    descripcion: "Robot con sensores y voz que responde a comandos.",
    precio: 12500,
    stock: 8,
    imagen: "assets/images/Img-Productos/Robot Interactivo Parlante.webp"
  },
  {
    id: "CRE-CIE-001",
    nombre: "Kit de Ciencia Volcánica",
    descripcion: "Simula erupciones con este divertido set de química.",
    precio: 4990,
    stock: 20,
    imagen: "assets/images/Img-Productos/images (3volc).jpeg"
  },
  {
    id: "CRE-CIE-002",
    nombre: "Microscopio Infantil",
    descripcion: "Ideal para que los peques exploren el mundo microscópico.",
    precio: 8900,
    stock: 10,
    imagen: "assets/images/Img-Productos/Microscopio junior.jpeg"
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
inicializarProductosBase();

  function toggleMenu() {
    const nav = document.getElementById("navRight");
    nav.classList.toggle("active");
  }

