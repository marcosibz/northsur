  document.querySelector('form').addEventListener('submit', (e) => {
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
        localStorage.setItem('tipo_usuario', usuario.tipo_usuario);
        localStorage.setItem('nombre', usuario.nombre);
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





