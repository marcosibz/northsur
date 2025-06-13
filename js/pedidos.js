fetch('http://localhost:3000/pedidos/cliente/1') // suponiendo cliente con ID 1
  .then(res => res.json())
  .then(pedidos => {
    const tbody = document.getElementById('lista-pedidos');
    pedidos.forEach(pedido => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.fecha}</td>
        <td>${pedido.productos.join(', ')}</td>
        <td>${pedido.estado}</td>
        <td>$${pedido.total}</td>
        <td>${pedido.estado === 'pendiente' ? '<button>Cancelar</button>' : ''}</td>
      `;
      tbody.appendChild(row);
    });
  });
