const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.get("/", async (req, res) => {
  try {
    const [sliders1] = await pool.query("SELECT * FROM slider1");
    const [sliders2] = await pool.query("SELECT * FROM slider2");
    const [actividades] = await pool.query("SELECT * FROM actividades");
    const [tarjetas] = await pool.query("SELECT * FROM tarjetas");
    const [tempsJunts] = await pool.query("SELECT * FROM tempsJunts");
    const [series] = await pool.query("SELECT * FROM series");

    res.render("index", {
      sliders1: sliders1,
      sliders2: sliders2,
      actividades: actividades,
      tarjetas: tarjetas,
      tempsJunts: tempsJunts,
      series: series,
      titulo: "Inicio",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los datos");
  }
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
