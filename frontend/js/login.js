document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const email = form.email.value;
    const contraseña = form.contraseña.value;
    const tipo_usuario = form.tipo_usuario.value;

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, contraseña, tipo_usuario })
    })
    .then(res => res.json())
    .then(usuario => {
      if (usuario) {
        localStorage.setItem('usuario_logueado', 'true');
        localStorage.setItem('tipo_usuario', tipo_usuario);
        alert('Bienvenido');
        window.location.href = 'index.html';
      } else {
        alert('Credenciales incorrectas');
      }
    })
    .catch(err => {
      console.error('Error en el login:', err);
    });
  });
});