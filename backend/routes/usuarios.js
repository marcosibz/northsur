const express = require('express');
const router = express.Router();
const db = require('../db');

// LOGIN (con registro automático)
router.post('/login', async (req, res) => {
  const { nombre = '', apellido = '', email, contraseña, tipo_usuario = 'cliente' } = req.body;
  try {
    // 1. Buscar usuario
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?',
      [email, contraseña]
    );
    if (rows.length > 0) {
      // Si existe, actualizar nombre y apellido si son distintos
      await db.query(
        'UPDATE usuarios SET nombre = ?, apellido = ? WHERE email = ?',
        [nombre, apellido, email]
      );
      // Devolver usuario actualizado
      const [actualizado] = await db.query(
        'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?',
        [email, contraseña]
      );
      return res.json(actualizado[0]);
    }
    // 2. Si no existe, crearlo con los datos recibidos
    await db.query(
      'INSERT INTO usuarios (nombre, apellido, email, contraseña, tipo_usuario, fecha_alta) VALUES (?, ?, ?, ?, ?, NOW())',
      [nombre, apellido, email, contraseña, tipo_usuario]
    );
    // 3. Buscar y devolver el nuevo usuario
    const [nuevo] = await db.query(
      'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?',
      [email, contraseña]
    );
    res.json(nuevo[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en login/registro automático' });
  }
});

module.exports = router;