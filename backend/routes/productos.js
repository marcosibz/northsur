const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Agregar un producto
router.post('/', async (req, res) => {
  const { codigo, descripcion, precio } = req.body;
  if (!codigo || !descripcion || !precio) {
    return res.status(400).json({ ok: false, error: 'Faltan datos' });
  }
  try {
    await db.query(
      'INSERT INTO productos (codigo_producto, descripcion, precio_unitario) VALUES (?, ?, ?)',
      [codigo, descripcion, precio]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

module.exports = router;