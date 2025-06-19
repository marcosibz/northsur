const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los pedidos
router.get('/', (req, res) => {
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
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Cambiar estado de un pedido
router.post('/:id/estado', (req, res) => {
  const { estado } = req.body;
  const { id } = req.params;
  const sql = `UPDATE pedidos SET estado = ? WHERE id_pedido = ?`;
  db.query(sql, [estado, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ mensaje: 'Estado actualizado correctamente' });
  });
});

module.exports = router;
