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

// Función para cargar productos desde LocalStorage y mostrarlos, combinando con productos del HTML
function cargarProductosGuardados() {
  // Leer los productos guardados en LocalStorage
  const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

  // Buscar el contenedor donde vamos a insertar los productos
  const productList = document.getElementById('productList');

  // Verificar que el contenedor existe antes de continuar
  if (!productList) {
    console.error('Contenedor de productos no encontrado en el DOM');
    return;
  }

  // Asegurarnos de que el contenedor esté vacío antes de agregar nuevos productos
  productList.innerHTML = '';

  // Primero, agrega los productos preexistentes en HTML, si los hay
  const productosPrevios = productList.querySelectorAll('.product-card');
  productosPrevios.forEach(producto => {
    productList.appendChild(producto);
  });

  // Luego, agrega los productos guardados en LocalStorage
  productosGuardados.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'product-card';  // Se mantiene la clase para aplicar los estilos existentes

    // Crear la estructura HTML de la tarjeta sin modificar los estilos actuales
    card.innerHTML = `
      <div class="toy-x">
        <div class="product-image">
          <img src="${producto.image}" alt="${producto.title}">
        </div>
        <div class="product-info">
          <h3 class="product-title">${producto.title}</h3>
          <p class="product-description">${producto.description}</p>
          <span class="product-price">$${producto.price.toFixed(2)}</span>
          <button class="add-to-cart">Añadir al carrito</button>
        </div>
      </div>
    `;

    // Agregar la tarjeta de producto al contenedor
    productList.appendChild(card);
  });
}

// Asegurarnos de que se carguen los productos cuando la página se haya cargado
document.addEventListener('DOMContentLoaded', () => {
  cargarProductosGuardados();
});

// Función para agregar un nuevo producto a LocalStorage
document.getElementById('addProductForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que la página se recargue

  // Obtener los valores del formulario
  const nombreInput = document.getElementById('productName');
  const descripcionInput = document.getElementById('productDescription');
  const precioInput = document.getElementById('productPrice');
  const imagenInput = document.getElementById('productImage');
  const stockInput = document.getElementById('productStock'); // Asegúrate de tener este campo en tu formulario

  // Validar que todos los campos estén completos
  if (!nombreInput.value || !descripcionInput.value || !precioInput.value || !stockInput.value || !imagenInput.value) {
    alert('Por favor, complete todos los campos.');
    return; // Detener la ejecución si algún campo está vacío
  }

  // Verificar que el precio y stock sean números válidos
  if (isNaN(precioInput.value) || isNaN(stockInput.value) || parseFloat(precioInput.value) <= 0 || parseInt(stockInput.value) <= 0) {
    alert('El precio y el stock deben ser valores numéricos positivos.');
    return;
  }

  // Crear el objeto del producto
  const nuevoProducto = {
    id: Date.now(), // Generar un ID único basado en el tiempo
    title: nombreInput.value,
    description: descripcionInput.value,
    price: parseFloat(precioInput.value),
    stock: parseInt(stockInput.value), // Asegúrate de que este campo se agregue en el objeto
    image: imagenInput.value || 'default-image.jpg', // Si no se especifica imagen, se usa una imagen predeterminada
  };

  // Guardar el producto en localStorage
  let productos = JSON.parse(localStorage.getItem('productos')) || [];
  productos.push(nuevoProducto);
  localStorage.setItem('productos', JSON.stringify(productos));

  // Mostrar el mensaje de éxito
  alert('Producto agregado correctamente');

  // Limpiar el formulario
  nombreInput.value = '';
  descripcionInput.value = '';
  precioInput.value = '';
  stockInput.value = '';
  imagenInput.value = '';
});

// Función para eliminar un producto sin id, usando otro criterio (por ejemplo, nombre)
function eliminarProductoSinId(nombre) {
  let productos = JSON.parse(localStorage.getItem('productos')) || [];

  // Filtrar los productos que no tienen el nombre especificado
  productos = productos.filter(producto => producto.title !== nombre);

  // Guardar los productos actualizados en LocalStorage
  localStorage.setItem('productos', JSON.stringify(productos));

  // Recargar los productos en la página
  cargarProductosGuardados();
}

//Función para cargar productos desde LocalStorage y mostrarlos
function cargarProductosGuardados() {
  const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
  const productList = document.getElementById('productList');

  if (!productList) {
    console.error('Contenedor de productos no encontrado en el DOM');
    return;
  }

  productList.innerHTML = ''; // Limpiar el contenedor antes de agregar productos

  productosGuardados.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <div class="toy-x">
        <div class="product-image">
          <img src="${producto.image}" alt="${producto.title}">
        </div>
        <div class="product-info">
          <h3 class="product-title">${producto.title}</h3>
          <p class="product-description">${producto.description}</p>
          <span class="product-price">$${producto.price.toFixed(2)}</span>
          <button class="add-to-cart">Añadir al carrito</button>
          <button class="delete-product" data-title="${producto.title}">Eliminar</button>
        </div>
      </div>
    `;

    // Agregar la tarjeta de producto al contenedor
    productList.appendChild(card);

    // Agregar evento de eliminación
    const deleteButton = card.querySelector('.delete-product');
    if (deleteButton) {
      deleteButton.addEventListener('click', function() {
        eliminarProductoSinId(producto.title);
      });
    }
  });
}
