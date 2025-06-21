document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('input[name=email]').value;
    const contraseña = document.querySelector('input[name=contraseña]').value;
    const tipo_usuario = document.querySelector('select[name=tipo_usuario]').value;

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, contraseña })
    })
    .then(res => res.json())
    .then(usuario => {
      if (usuario) {
        // Guarda el estado de logueo y el tipo de usuario seleccionado
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
