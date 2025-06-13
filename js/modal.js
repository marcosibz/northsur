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
