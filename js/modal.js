document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-destino");
  const btnAbrir = document.querySelector('a[href="#modal-destino"]');
  const btnCerrar = document.getElementById("cerrar-modal");

  // Abrir modal
  btnAbrir.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  // Cerrar modal con botón X
  btnCerrar.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Enviar formulario
  const form = document.getElementById("form-destino");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const destino = {
      nombre: form.nombre.value,
      localidad: form.localidad.value,
      imagen: form.imagen.value,
      precio: form.precio.value,
      categoria: form.categoria.value,
      descripcion: form.descripcion.value,
    };

    console.log("Destino agregado:", destino);

    // Resetear formulario y cerrar modal
    form.reset();
    modal.style.display = "none";

    // Aquí podrías agregar el destino dinámicamente a la página si lo deseas
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-destino");
  const btnCerrar = document.getElementById("cerrar-modal");
  const form = document.getElementById("form-destino");
  const modalTitulo = document.getElementById("modal-titulo");
  const idInput = document.getElementById("destino-id");

  // Cerrar modal con X
  btnCerrar.addEventListener("click", () => modal.style.display = "none");

  // Cerrar modal al hacer clic afuera
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Escuchar todos los botones "Editar"
  document.querySelectorAll(".btn-editar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const producto = e.target.closest(".producto");

      // Cargar datos en el formulario
      form.nombre.value = producto.dataset.nombre;
      form.localidad.value = producto.dataset.localidad;
      form.imagen.value = producto.dataset.imagen;
      form.precio.value = producto.dataset.precio;
      form.categoria.value = producto.dataset.categoria;
      form.descripcion.value = producto.dataset.descripcion;
      idInput.value = producto.dataset.id;

      modalTitulo.textContent = "Editar destino";
      modal.style.display = "block";
    });
  });

  // Manejo del envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const destinoActualizado = {
      id: idInput.value,
      nombre: form.nombre.value,
      localidad: form.localidad.value,
      imagen: form.imagen.value,
      precio: form.precio.value,
      categoria: form.categoria.value,
      descripcion: form.descripcion.value,
    };

    console.log("Destino editado:", destinoActualizado);

    // Acá podrías actualizar el DOM o enviar los cambios a un servidor

    modal.style.display = "none";
    form.reset();
  });
});
