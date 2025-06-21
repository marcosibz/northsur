const express = require('express');
const cors = require('cors');
const path = require('path');
const pedidosRoutes = require('./routes/pedidos');
const usuariosRouter = require('./routes/usuarios');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../')));

app.use('/api', usuariosRouter);

app.use('/api/pedidos', pedidosRoutes);

app.get('/api/pedidos', async (req, res) => {
  res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});


