const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './productos.json';

// Leer productos desde archivo o iniciar vacío

if (fs.existsSync(DATA_FILE)) {
  try {
    productos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (err) {
    console.error('Error leyendo productos.json:', err);
    productos = [];
  }
}

// Guardar productos en archivo
function guardarProductos() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(productos, null, 2));
}

// GET: Listar productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// POST: Agregar producto
app.post('/productos', (req, res) => {
  const producto = req.body;
  producto.id = Date.now(); // id único
  productos.push(producto);
  guardarProductos();
  res.status(201).json(producto);
});

// DELETE: Eliminar producto por ID
app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  productos = productos.filter(p => p.id !== id);
  guardarProductos();
  res.sendStatus(204);
});

// PUT: Actualizar producto por ID
app.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body, id };
    guardarProductos();
    res.json(productos[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
