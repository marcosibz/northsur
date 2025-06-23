const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'nortesur'
});

db.getConnection()
  .then(() => console.log('Conectado a la base de datos MySQL'))
  .catch(err => console.error('Error al conectar a MySQL:', err));

module.exports = db;