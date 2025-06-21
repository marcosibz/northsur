// Limpia tipo_usuario si no hay usuario logueado
if (!localStorage.getItem('usuario_logueado')) {
  localStorage.removeItem('tipo_usuario');
}

document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogueado = localStorage.getItem('usuario_logueado');
  const tipoUsuario = localStorage.getItem('tipo_usuario');
  let headerHTML = `
    <header id="header">
      <nav class="navbar">
        <h1 style="color: #fff;">NorthSur™</h1>
        <ul id="navlinks">
          <li><button class="btnuiv"><a href="index.html">Inicio</a></button></li>
          <li><button class="btnuiv carrito-icono" onclick="toggleCarrito()"><a>Carrito</a></button></li>
  `;

  if (usuarioLogueado) {
    headerHTML += `<li><button class="btnuiv" id="cerrar-sesion-btn">Cerrar sesión</button></li>`;
  } else {
    headerHTML += `<li><button class="btnuiv"><a href="login.html">Iniciar sesión</a></button></li>`;
  }

  headerHTML += `</ul></nav></header>`;
  document.getElementById('header').innerHTML = headerHTML;

  // Botón Panel de Jefe solo si es jefe y está logueado
  // ...después de document.getElementById('header').innerHTML = headerHTML;
if (usuarioLogueado === 'true' && tipoUsuario === 'jefe_ventas') {
  const navLinks = document.getElementById('navlinks');
  if (!document.getElementById('boton-jefe')) {
    const li = document.createElement('li');
    li.innerHTML = `<button id="boton-jefe" class="btnuiv"><a href="jefedv.html">Panel de Jefe</a></button>`;
    navLinks.appendChild(li);
  }
}

  // Evento cerrar sesión
  const cerrarSesionBtn = document.getElementById('cerrar-sesion-btn');
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', () => {
      localStorage.removeItem('usuario_logueado');
      localStorage.removeItem('tipo_usuario');
      location.reload();
    });
  }

  
  // ------------------- Carrito -------------------
  
  let carrito = [];
  
  function toggleCarrito() {
    const carritoElemento = document.querySelector('.carrito');
  if (carritoElemento) {
    carritoElemento.style.display = carritoElemento.style.display === 'none' ? 'block' : 'none';
  }
}

function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(p => p.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  renderizarCarrito();
}

function cambiarCantidad(nombre, delta) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (!producto) return;
  producto.cantidad += delta;
  if (producto.cantidad < 1) {
    eliminarProducto(nombre);
  } else {
    renderizarCarrito();
  }
}

function eliminarProducto(nombre) {
  carrito = carrito.filter(p => p.nombre !== nombre);
  renderizarCarrito();
}

function renderizarCarrito() {
  const contenedor = document.querySelector('.productos-carrito');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  let total = 0;
  carrito.forEach(producto => {
    const item = document.createElement('div');
    item.className = 'producto';
    item.innerHTML = `
    <p>${producto.nombre}</p>
    <p>$${producto.precio.toLocaleString()}</p>
    <div>
    <button class="btn-product" onclick="cambiarCantidad('${producto.nombre}', -1)">-</button>
    <input class="input-prod" type="number" value="${producto.cantidad}" readonly style="width: 1.5rem; text-align: center;">
    <button class="btn-product" onclick="cambiarCantidad('${producto.nombre}', 1)">+</button>
    <button class="btn-product" onclick="eliminarProducto('${producto.nombre}')">🗑️</button>
    </div>
    `;
    contenedor.appendChild(item);
    total += producto.precio * producto.cantidad;
  });
  const totalElem = document.querySelector('.total');
  if (totalElem) {
    totalElem.textContent = `Total: $${total.toLocaleString()}`;
  }
}

// ------------------- Footer -------------------

document.getElementById("footer").innerHTML = `
<footer class="footer" id="footer">
<div class="footer-content">
<div class="footer-section">
<h3>Sobre NorthSur</h3>
<ul>
<li><a href="#">Quiénes somos</a></li>
<li><a href="#">Feriados Nacionales</a></li>
<li><a href="#">Afiliados</a></li>
<li><a href="#">Alquileres</a></li>
</ul>
</div>
<div class="footer-section">
<h3>Soporte</h3>
<ul>
<li><a href="#">Preguntas frecuentes</a></li>
<li><a href="#">Contacto</a></li>
<li><a href="#">Política de privacidad</a></li>
<li><a href="#">Términos y condiciones</a></li>
<li><a href="#">Libro de quejas online</a></li>
</ul>
</div>
<div class="footer-section">
<h3>Seguinos</h3>
<div class="social-icons">
<img src="assets/img/ig.png" alt="Instagram">
<img src="assets/img/facebook.png" alt="Facebook">
<img src="assets/img/x.png" alt="Twitter">
<img src="assets/img/yt.png" alt="Youtube">
<img src="assets/img/linkedin.png" alt="Linkedin">
<img src="assets/img/tiktok.png" alt="TikTok">
</div>
<p>Copyright © 2025 NorthSur. Todos los derechos reservados.</p>
</div>
</div>
</footer>
`;
});