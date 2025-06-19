document.addEventListener('DOMContentLoaded', () => {
  const tipo = localStorage.getItem('tipo_usuario');

  // Construcción base del header
  let headerHTML = `
    <header id="header">
      <nav class="navbar">
        <h1 style="color: #fff;">NorthSur™</h1>
        <ul id="nav-links">
          <li><button class="btnuiv"><a href="index.html">Inicio</a></button></li>
          <li><button class="btnuiv carrito-icono" onclick="toggleCarrito()"><a>Carrito</a></button></li>
          <li><button class="btnuiv"><a href="mis-pedidos.html">Mis pedidos</a></button></li>
          <li><button class="btnuiv"><a href="login.html">Iniciar sesión</a></button></li>
  `;

  // Agregamos el botón de jefe si corresponde
  if (tipo === 'jefe_ventas') {
    headerHTML += `
      <li><button class="btnuiv"><a href="jefedv.html">Panel Jefe</a></button></li>
    `;
  }

  // Cerramos el UL y el resto del HTML
  headerHTML += `
        </ul>
        </nav>
        <div class="carrito-container">
        <div class="carrito" style="display: none;">
        <div class="productos-carrito"></div>
            <div class="total">Total: $0</div>
            <a href="#" class="finalizar">Finalizar Compra</a>
            </div>
            </div>
            </header>
            `;

  // Finalmente inyectamos todo
  document.getElementById("header").innerHTML = headerHTML;
});




// carrito

let carrito = [];

let producto 

function toggleCarrito() {
    const carritoElemento = document.querySelector('.carrito');
    carritoElemento.style.display = carritoElemento.style.display === 'none' ? 'block' : 'none';
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

    document.querySelector('.total').textContent = `Total: $${total.toLocaleString()}`;
}

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
  </footer> `;

  



