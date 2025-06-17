// Simulación de pedidos obtenidos de la base de datos
const pedidos = [
  {
    id: 1,
    cliente: "Marcos Ibañez",
    fecha: "2025-06-17",
    total: 8500.00,
    estado: "pendiente"
  },
  {
    id: 2,
    cliente: "Lucía Gómez",
    fecha: "2025-06-15",
    total: 12000.50,
    estado: "entregado"
  }
];

const tablaPedidos = document.getElementById("tablaPedidos");
const filtro = document.getElementById("filtroEstado");

// Función para mostrar pedidos en la tabla
function mostrarPedidos() {
  const estadoSeleccionado = filtro.value;
  tablaPedidos.innerHTML = "";

  pedidos
    .filter(p => estadoSeleccionado === "todos" || p.estado === estadoSeleccionado)
    .forEach(p => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${p.id}</td>
        <td>${p.cliente}</td>
        <td>${p.fecha}</td>
        <td>$${p.total.toFixed(2)}</td>
        <td>${p.estado}</td>
        <td>
          <button onclick="cambiarEstado(${p.id}, 'entregado')">Entregado</button>
          <button onclick="cambiarEstado(${p.id}, 'anulado')">Anulado</button>
        </td>
      `;

      tablaPedidos.appendChild(fila);
    });
}

// Simulación de cambio de estado
function cambiarEstado(id, nuevoEstado) {
  const pedido = pedidos.find(p => p.id === id);
  if (pedido) {
    pedido.estado = nuevoEstado;
    alert(`Estado del pedido ${id} cambiado a: ${nuevoEstado}`);
    mostrarPedidos();
  }
}

// Eventos
filtro.addEventListener("change", mostrarPedidos);

// Inicializar tabla
mostrarPedidos();
