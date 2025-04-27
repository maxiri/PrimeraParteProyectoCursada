const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(multer({ dest: 'uploads/' }).single('productImage'));

// Simulando una base de datos en memoria
let productos = [];

app.post('/api/agregar-producto', (req, res) => {
  const { productName, productDescription, productPrice, productStock } = req.body;
  const newProduct = { 
    id: Date.now(), 
    productName, 
    productDescription, 
    productPrice, 
    productStock 
  };
  productos.push(newProduct);
  res.json({ message: 'Producto agregado con éxito' });
});

app.delete('/api/eliminar-producto/:id', (req, res) => {
  const { id } = req.params;
  productos = productos.filter(product => product.id !== id);
  res.json({ message: 'Producto eliminado con éxito' });
});

app.put('/api/actualizar-stock/:id', (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;
  const product = productos.find(product => product.id === id);
  if (product) {
    product.productStock = stock;
    res.json({ message: 'Stock actualizado correctamente' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});

