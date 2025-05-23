document.addEventListener('DOMContentLoaded', function () {
  const addForm = document.getElementById("addProductForm");
  const deleteForm = document.getElementById("deleteProductForm");
  const categorySelect = document.getElementById("productCategory");
  const subcategorySelect = document.getElementById("productSubcategory");

  const subcategoriasPorCategoria = {
    ESP: [
      { id: "DEC", nombre: "🛏️ Deco Infantil Cósmico" },
      { id: "FIG", nombre: "👾 Figuras y Personajes" }
    ],
    TEC: [
      { id: "INT", nombre: "🎮 Juegos Interactivos" },
      { id: "ROM", nombre: "🧩 Juegos de mesa y rompecabezas" }
    ],
    CRE: [
      { id: "EDU", nombre: "🧪 Juguetes Educativos / Científicos" },
      { id: "LIB", nombre: "📚 Libros y cuentos" }
    ],
    OTR: [
      { id: "MER", nombre: "🧑‍🚀 Accesorios y merchandising" }
    ]
  };

  if (addForm) addForm.addEventListener("submit", manejarAltaProducto);
  if (deleteForm) deleteForm.addEventListener("submit", manejarEliminacionProducto);

  if (categorySelect) {
    categorySelect.addEventListener("change", function () {
      actualizarSubcategorias(categorySelect.value);
    });
  }

  function actualizarSubcategorias(categoria) {
    subcategorySelect.innerHTML = '<option value="">-- Seleccionar subcategoría --</option>';
    if (subcategoriasPorCategoria[categoria]) {
      subcategoriasPorCategoria[categoria].forEach(sub => {
        const option = document.createElement("option");
        option.value = sub.id;
        option.textContent = sub.nombre;
        subcategorySelect.appendChild(option);
      });
    }
  }

  cargarProductosGuardados();

  const logo = document.getElementById("logo");
  if (logo) logo.addEventListener("click", () => window.location.href = "index.html");

  const modal = document.getElementById("modal-acceso");
  const inputCodigo = document.getElementById("input-codigo");
  const btnValidar = document.getElementById("btn-validar-codigo");

  if (modal && inputCodigo && btnValidar) {
    modal.style.display = "flex";
    btnValidar.addEventListener("click", validarCodigo);
    inputCodigo.addEventListener("keyup", e => {
      if (e.key === "Enter") validarCodigo();
    });
  }

  const searchButton = document.getElementById('searchButton');
  const searchIdInput = document.getElementById('searchId');
  const searchResultDiv = document.getElementById('searchResult');

  if (searchButton && searchIdInput && searchResultDiv) {
    searchButton.addEventListener('click', function () {
      const termino = searchIdInput.value.trim().toLowerCase();
      const productos = JSON.parse(localStorage.getItem('productos')) || [];

      const coincidencias = productos.filter(p =>
        p.id && p.id.toLowerCase().includes(termino)
      );

      searchResultDiv.innerHTML = '';

      if (coincidencias.length === 0) {
        searchResultDiv.innerHTML = `<p>❌ No se encontró ningún producto con ese ID.</p>`;
        return;
      }

      coincidencias.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-item', 'product-card');
        card.innerHTML = `
          <div class="product-image">
            <img src="${producto.imagen}" alt="${producto.nombre}" />
          </div>
          <div class="product-info">
            <h3 class="product-title">${producto.nombre}</h3>
            <p class="product-description"><strong>Descripción:</strong> ${producto.descripcion}</p>
            <p class="product-price"><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Stock:</strong> ${producto.stock}</p>
            <p><strong>ID:</strong> ${resaltarCoincidencia(producto.id, termino)}</p>
            <button class="add-to-cart">Añadir al carrito</button>
          </div>
        `;

        card.querySelector(".add-to-cart").addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        searchResultDiv.appendChild(card);
      });
    });
  }

  const formInputs = [
    "productName",
    "productDescription",
    "productPrice",
    "productStock",
    "productCategory",
    "productSubcategory"
  ];

  formInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener("input", mostrarPreviewId);
    }
  });
});

function manejarAltaProducto(e) {
  e.preventDefault();

  const nombre = document.getElementById("productName").value.trim();
  const descripcion = document.getElementById("productDescription").value.trim();
  const precio = parseFloat(document.getElementById("productPrice").value.trim());
  const stock = parseInt(document.getElementById("productStock").value.trim());
  const imagenInput = document.getElementById("productImage");
  const imagenFile = imagenInput.files[0];
  const categoria = document.getElementById("productCategory").value;
  const subcategoria = document.getElementById("productSubcategory").value;
  const edadDesde = parseInt(document.getElementById("productAgeFrom").value);
  const edadHasta = parseInt(document.getElementById("productAgeTo").value);
  const envioSinCargo = document.getElementById("productFreeShipping").checked;

  if (!categoria || !subcategoria || !nombre || !descripcion || isNaN(precio) || isNaN(stock) || isNaN(edadDesde) || isNaN(edadHasta)) {
    alert("❌ Por favor completá todos los campos correctamente.");
    return;
  }

  const idBase = `${categoria}-${subcategoria}`;
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const relacionados = productos.filter(p => p.id.startsWith(idBase));
  const nuevoId = `${idBase}-${relacionados.length + 1}`;

  const reader = new FileReader();
  reader.onload = () => {
    const imagenData = imagenFile ? reader.result : "assets/images/placeholder.png";

    const productoPreview = {
      id: nuevoId,
      nombre,
      descripcion,
      precio,
      stock,
      imagen: imagenData,
      categoria,
      subcategoria,
      edadDesde,
      edadHasta,
      envioSinCargo
    };

    mostrarPreviewModal(productoPreview);
  };

  if (imagenFile) {
    reader.readAsDataURL(imagenFile);
  } else {
    reader.onload();
  }
}

function mostrarPreviewModal(producto) {
  const modal = document.getElementById("previewModal");
  const content = document.getElementById("previewContent");

  content.innerHTML = `
    <p><strong>🆔 ID:</strong> ${producto.id}</p>
    <p><strong>📦 Nombre:</strong> ${producto.nombre}</p>
    <p><strong>📝 Descripción:</strong> ${producto.descripcion}</p>
    <p><strong>💰 Precio:</strong> $${producto.precio}</p>
    <p><strong>📊 Stock:</strong> ${producto.stock}</p>
    <p><strong>🎂 Edad:</strong> ${producto.edadDesde} a ${producto.edadHasta} años</p>
    <p><strong>🚚 Envío sin cargo:</strong> ${producto.envioSinCargo ? "Sí" : "No"}</p>
    <p><strong>📁 Categoría:</strong> ${producto.categoria}</p>
    <p><strong>📂 Subcategoría:</strong> ${producto.subcategoria}</p>
    <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 200px;" />
  `;

  modal.style.display = "flex";

  document.getElementById("confirmAdd").onclick = () => {
    guardarProducto(producto);
    agregarProductoAlDom(producto);
    document.getElementById("addProductForm").reset();
    document.getElementById("productSubcategory").innerHTML = '<option value="">Seleccionar Subcategoría</option>';
    modal.style.display = "none";
  };

  document.getElementById("cancelPreview").onclick = () => {
    modal.style.display = "none";
  };
}

function guardarProducto(producto) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductosGuardados() {
  const contenedor = document.getElementById("productList") || document.getElementById("contenedor-productos");
  if (!contenedor) return;

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

  card.querySelector(".add-to-cart").addEventListener("click", () => {
    agregarAlCarrito(producto);
  });

  contenedor.appendChild(card);
}

function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existente = carrito.find(item => item.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`🛒 ${producto.nombre} agregado al carrito`);
}

function manejarEliminacionProducto(e) {
  e.preventDefault();
  const id = document.getElementById("productId").value.trim();
  if (!id) return alert("Por favor ingresa un ID válido.");

  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  const nuevos = productos.filter(p => p.id !== id);

  if (nuevos.length === productos.length) {
    alert("❌ No se encontró ningún producto con ese ID.");
    return;
  }

  localStorage.setItem("productos", JSON.stringify(nuevos));
  alert("✅ Producto eliminado correctamente.");
  location.reload();
}

function mostrarPreviewId() {
  const nombre = document.getElementById("productName").value.trim();
  const descripcion = document.getElementById("productDescription").value.trim();
  const precio = parseFloat(document.getElementById("productPrice").value.trim());
  const stock = parseInt(document.getElementById("productStock").value.trim());
  const categoria = document.getElementById("productCategory").value;
  const subcategoria = document.getElementById("productSubcategory").value;
  const preview = document.getElementById("previewId");

  if (!nombre || !descripcion || isNaN(precio) || isNaN(stock) || !categoria || !subcategoria) {
    preview.textContent = "";
    return;
  }

  const idBase = `${categoria}-${subcategoria}`;
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const relacionados = productos.filter(p => p.id.startsWith(idBase));
  const nuevoId = `${idBase}-${relacionados.length + 1}`;

  preview.textContent = `🔢 ID generado: ${nuevoId}`;
}

function validarCodigo() {
  const inputCodigo = document.getElementById("input-codigo");
  const modal = document.getElementById("modal-acceso");
  if (inputCodigo.value === "cosmica123") {
    modal.style.display = "none";
  } else {
    alert("🚫 Código incorrecto. Redirigiendo al inicio...");
    window.location.href = "index.html";
  }
}

function resaltarCoincidencia(texto, termino) {
  if (!termino) return texto;
  const regex = new RegExp(`(${termino})`, 'gi');
  return texto.replace(regex, '<mark>$1</mark>');
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  document.querySelector("header")?.classList.toggle("dark-mode", isDark);
  document.querySelector("nav")?.classList.toggle("dark-mode", isDark);
  document.querySelector("footer")?.classList.toggle("dark-mode", isDark);
  localStorage.setItem("dark-mode", isDark);
}
