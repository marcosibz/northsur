document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-agregar');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const codigo = form.codigo.value;
    const descripcion = form.descripcion.value;
    const precio = form.precio.value;

    const nuevoProducto = { codigo, descripcion, precio };
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));

    alert('Producto agregado con éxito');
    form.reset();
  });
});

fetch('http://localhost:3000/api/pedidos')
  .then(res => res.json())
  .then(data => {
    console.log('Datos recibidos:', data); // para verificar en consola

    const tabla = document.querySelector('#tablaPedidos');
    tabla.innerHTML = '';

    data.forEach(pedido => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${pedido.id_pedido}</td>
        <td>${pedido.nombre}</td>
        <td>${pedido.apellido}</td>
        <td>${new Date(pedido.fecha_pedido).toLocaleDateString()}</td>
        <td>$${pedido.total}</td>
        <td>
          <select onchange="actualizarEstado(${pedido.id_pedido}, this.value)">
            <option value="">Seleccionar</option>
            <option value="pendiente" ${pedido.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
            <option value="entregado" ${pedido.estado === 'entregado' ? 'selected' : ''}>Entregado</option>
            <option value="anulado" ${pedido.estado === 'anulado' ? 'selected' : ''}>Anulado</option>
          </select>
        </td>
      `;
      tabla.appendChild(fila);
    });
  })
  .catch(err => {
    console.error('Error al obtener pedidos:', err);
  });

function actualizarEstado(id, estado) {
  fetch(`http://localhost:3000/api/pedidos/${id}/estado`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ estado })
  })
  .then(res => res.json())
  .then(response => {
    alert(response.mensaje || 'Estado actualizado');
    location.reload();
  })
  .catch(err => {
    console.error('Error al actualizar estado:', err);
    alert('Hubo un error al actualizar el estado');
  });
}



// Agregar eventos a todos los <select> creados
document.querySelectorAll('select').forEach(select => {
  select.addEventListener('change', e => {
    const estado = e.target.value;
    const id = e.target.getAttribute('data-id');
    
    fetch(`http://localhost:3000/api/pedidos/${id}/estado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ estado })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.mensaje);
    })
    .catch(err => {
      console.error('Error al actualizar estado:', err);
    });
  });
});

// cargar productos

  const form = document.getElementById("form-producto");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const codigo = document.getElementById("codigo").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;

    // Obtenemos productos anteriores o lista vacía
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Agregamos el nuevo
    productos.push({ codigo, descripcion, precio });

    // Guardamos en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto agregado correctamente.");
    form.reset();
  });



