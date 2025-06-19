const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/registro', async (req, res) => {
  const { nombre, apellido, email, contraseña, tipo_usuario } = req.body;

  try {
    const sql = 'INSERT INTO usuarios (nombre, apellido, email, contraseña, tipo_usuario) VALUES (?, ?, ?, ?, ?)';
    await db.query(sql, [nombre, apellido, email, contraseña, tipo_usuario]);
    res.json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});


router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ? AND contraseña = ?', [email, contraseña]);


    if (rows.length > 0) {
    console.log('Usuario encontrado:', rows[0]);
      res.json(rows[0]);
    } else {
      res.status(401).json(null);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el login' });
  }
});

module.exports = router;