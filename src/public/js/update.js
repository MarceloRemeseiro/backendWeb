const editButtons = document.querySelectorAll(".btn-warning");
const modal = document.getElementById("modalEdit");
const form = modal.querySelector("form");
const idInput = form.querySelector("input[name='id']");
const tituloInput = form.querySelector("input[name='editTitulo']");
const subtituloInput = form.querySelector("input[name='editSubtitulo']");
const imagenInput = form.querySelector("input[name='editImagen']");
const linkInput = form.querySelector("input[name='editLink']");
const textoTarjetaInput = form.querySelector("input[name='editTextoTarjeta']");
const textoInput = form.querySelector("textarea[name='editTexto']");
const ordenSelect = form.querySelector("select[name='editOrden']");
const webInput = form.querySelector("input[name='editWeb']");
const botonInput = form.querySelector("input[name='editBoton']");
const fechaInput = form.querySelector("input[name='editFecha']");
const saveButton = document.getElementById("saveChanges");

let type;

editButtons.forEach((button) => {
  button.addEventListener("click", async function (e) {
    e.preventDefault();
    type = e.target.dataset.type; // Asigna el valor del atributo de datos al tipo de variable
    const url = e.target.href;
    const response = await fetch(url);
    const [data] = await response.json(); // <-- Añade la desestructuración del array aquí
    idInput.value = data.id;
    imagenInput.value = data.imagen;
    webInput.checked = data.web;
    console.log(idInput.value); // este llega undefined

    switch (type) {
      case "series":
        tituloInput.value = data.titulo;
        subtituloInput.value = data.subtitulo;
        linkInput.value = data.link;
        ordenSelect.value = data.orden;
        break;
      case "actividades":
        tituloInput.value = data.titulo;
        textoTarjetaInput.value = data.textoTarjeta;
        textoInput.value = data.texto;
        botonInput.checked = data.boton ;
        ordenSelect.value = data.orden;
        break;
      case "slider1":
        tituloInput.value = data.titulo;
        subtituloInput.value = data.subtitulo;
        linkInput.value = data.link;
        break;
      case "slider2":
        linkInput.value = data.link;
        break;
      case "tarjetas":
        tituloInput.value = data.titulo;
        subtituloInput.value = data.subtitulo;
        textoInput.value = data.texto;
        linkInput.value = data.link;
        break;
      case "tempsJunts":
        const dateObj = new Date(data.fecha);
        const formattedDate = dateObj.toISOString().split("T")[0];
        tituloInput.value = data.titulo;
        subtituloInput.value = data.subtitulo;
        textoInput.value = data.texto;
        linkInput.value = data.link;
        fechaInput.value = formattedDate;
        break;
    }

    form.action = `/update/${data.id}`;

    modal.style.display = "block";
  });
});

function updateData(url, data) {
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    window.location.reload();
  });
}

saveButton.addEventListener("click", function (e) {
  e.preventDefault();
  const id = idInput.value;
  let data;
  switch (type) {
    case "series":
      data = {
        titulo: tituloInput.value,
        subtitulo: subtituloInput.value,
        imagen: imagenInput.value,
        link: linkInput.value,
        web: webInput.checked,
        orden: ordenSelect.value,
      };
      updateData(`/series/update/${id}`, data);
      break;
    case "actividades":
      data = {
        titulo: tituloInput.value,
        imagen: imagenInput.value,
        textoTarjeta: textoTarjetaInput.value,
        texto: textoInput.value,
        boton: botonInput.checked,
        web: webInput.checked,
        orden: ordenSelect.value,
      };
      updateData(`/actividades/update/${id}`, data);
      break;
    case "slider1":
      data = {
        titulo: tituloInput.value,
        subtitulo: subtituloInput.value,
        imagen: imagenInput.value,
        link: linkInput.value,
        web: webInput.checked,
      };
      updateData(`/slider1/update/${id}`, data);
      break;
    case "slider2":
      data = {
        imagen: imagenInput.value,
        link: linkInput.value,
        web: webInput.checked,
      };
      updateData(`/slider2/update/${id}`, data);
      break;
    case "tarjetas":
      data = {
        titulo: tituloInput.value,
        subtitulo: subtituloInput.value,
        texto: textoInput.value,
        imagen: imagenInput.value,
        web: webInput.checked,
        link: linkInput.value,
      };
      updateData(`/tarjetas/update/${id}`, data);
      break;
    case "tempsJunts":
      data = {
        titulo: tituloInput.value,
        subtitulo: subtituloInput.value,
        texto: textoInput.value,
        imagen: imagenInput.value,
        fecha: fechaInput.value,
        web: webInput.checked,
        link: linkInput.value,
      };
      updateData(`/tempsJunts/update/${id}`, data);
      break;
  }
});
