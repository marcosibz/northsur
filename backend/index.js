const express = require('express');
const cors = require('cors');
const path = require('path');
const pedidosRoutes = require('./routes/pedidos');
const usuariosRouter = require('./routes/usuarios');
const productosRouter = require('./routes/productos');
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));
// app.use('/frontend', express.static(path.join(__dirname, '../frontend')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.use(express.static(path.join(__dirname, '../')));

app.use('/api/usuarios', usuariosRouter);

app.use('/api/productos', productosRouter);

app.use('/api', usuariosRouter);
app.use('/api/pedidos', pedidosRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});