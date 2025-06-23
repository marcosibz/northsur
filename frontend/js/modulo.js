if (!localStorage.getItem('usuario_logueado')) {
  localStorage.removeItem('tipo_usuario');
}

document.addEventListener('DOMContentLoaded', async () => {
  // --- HEADER ---
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

  if (usuarioLogueado === 'true') {
    headerHTML += `<li><button class="btnuiv" id="cerrar-sesion-btn">Cerrar sesión</button></li>`;
  } else {
    headerHTML += `<li><button class="btnuiv"><a href="login.html">Iniciar sesión</a></button></li>`;
  }

  headerHTML += `</ul></nav></header>`;
  document.getElementById('header').innerHTML = headerHTML;

  // Botón Panel de Jefe solo si es jefe y está logueado
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

  const contenedor = document.getElementById('contenedor-productos');
  if (contenedor) {
    try {
      const res = await fetch('/api/productos');
      const productos = await res.json();
      contenedor.innerHTML = '';
      productos.forEach(prod => {
        contenedor.innerHTML += `
          <div class="tarjeta">
            <h4>${prod.descripcion}</h4>
            <p>Código: ${prod.codigo_producto}</p>
            <p>Precio: $${prod.precio_unitario}</p>
            <button class="modern-btn" onclick="agregarAlCarrito('${prod.descripcion}', ${prod.precio_unitario})">
              <span>Agregar</span><i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        `;
      });
    } catch (err) {
      contenedor.innerHTML = '<p>Error al cargar productos.</p>';
      console.error(err);
    }
  }
});


// carrito
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

function eliminarProductoCarrito(nombre) {
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
  <button class="btn-product" onclick="eliminarProductoCarrito('${producto.nombre}')">🗑️</button>
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
  
  

//Footer 

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
<img src="/frontend/assets/img/ig.png" alt="Instagram">
<img src="/frontend/assets/img/facebook.png" alt="Facebook">
<img src="/frontend/assets/img/x.png" alt="Twitter">
<img src="/frontend/assets/img/yt.png" alt="Youtube">
<img src="/frontend/assets/img/linkedin.png" alt="Linkedin">
<img src="/frontend/assets/img/tiktok.png" alt="TikTok">
</div>
<p>Copyright © 2025 NorthSur. Todos los derechos reservados.</p>
</div>
</div>
</footer>
`;

// Ejemplo para el panel de jefe
// document.getElementById('form-producto').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const codigo = document.getElementById('codigo').value.trim();
//   const descripcion = document.getElementById('descripcion').value.trim();
//   const precio = document.getElementById('precio').value.trim();

//   if (!codigo || !descripcion || !precio) {
//     alert('Completa todos los campos');
//     return;
//   }

//   await fetch('/api/productos', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ codigo, descripcion, precio })
//   });

//   alert('Producto agregado');
//   e.target.reset();
// });