const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los pedidos
router.get('/', async (req, res) => {
  const sql = `
    SELECT 
      p.id_pedido, 
      u.nombre, 
      u.apellido, 
      p.estado, 
      p.fecha_pedido, 
      p.total
    FROM pedidos p
    JOIN usuarios u ON p.id_usuario = u.id_usuario
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Cambiar estado de un pedido
router.post('/:id/estado', async (req, res) => {
  const { estado } = req.body;
  const { id } = req.params;
  const sql = `UPDATE pedidos SET estado = ? WHERE id_pedido = ?`;
  try {
    await db.query(sql, [estado, id]);
    res.send({ mensaje: 'Estado actualizado correctamente' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;