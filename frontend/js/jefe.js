document.addEventListener('DOMContentLoaded', () => {
  // --- AGREGAR PRODUCTO ---
  const formProducto = document.getElementById('form-producto');
  if (formProducto) {
    formProducto.addEventListener('submit', async (e) => {
      e.preventDefault();
      const codigo = document.getElementById('codigo').value.trim();
      const descripcion = document.getElementById('descripcion').value.trim();
      const precio = document.getElementById('precio').value.trim();

      console.log('Datos a enviar:', { codigo, descripcion, precio });

      if (!codigo || !descripcion || !precio) {
        alert('Completa todos los campos');
        return;
      }

      const respuesta = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo, descripcion, precio })
      });
      const data = await respuesta.json();
      console.log('Respuesta del backend:', data);

      alert('Producto agregado');
      e.target.reset();
    });
  }

  // --- PEDIDOS (si tu panel de jefe los muestra) ---
  fetch('http://localhost:3000/api/pedidos')
    .then(res => res.json())
    .then(data => {
      console.log('Datos recibidos:', data); // para verificar en consola

      const tabla = document.querySelector('#tablaPedidos');
      if (tabla) {
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
      }
    })
    .catch(err => {
      console.error('Error al obtener pedidos:', err);
    });
});

// --- ACTUALIZAR ESTADO PEDIDO ---
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