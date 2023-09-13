
window.ml = cloudinary.createMediaLibrary(
  {
    cloud_name: cloudName,
    api_key: apiKey,
    username: "mediavdm@gmail.com",
    button_class: "btn btn-primary mt-5",
    button_caption: "Imagenes",
  },
  {
    insertHandler: function (data) {
      data.assets.forEach((asset) => {
        console.log("Inserted asset:", JSON.stringify(asset, null, 2));
      });
      // Aquí puedes agregar código para actualizar el grid de imágenes con las imágenes seleccionadas
    },
  },
  document.getElementById("open-btn")
);
