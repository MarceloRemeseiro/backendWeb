const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { titulo: "Home", tituloPagina: "Página Principal" });
});



router.get("/imagenes", (req, res) => {
  res.render("imagenes", {
    tituloPagina: "Imágenes",
    titulo: "Imágenes",
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
});

module.exports = router;
