const express = require("express");
const router = express.Router();
const { queryWithLog } = require("../db/db");

router.get("/", async (req, res) => {
  try {
    const sliders1Result = await queryWithLog("SELECT * FROM slider1 WHERE web = true ORDER BY orden NULLS LAST");
    const sliders2Result = await queryWithLog("SELECT * FROM slider2 WHERE web = true");
    const actividadesResult = await queryWithLog("SELECT * FROM actividades WHERE web = true ORDER BY orden");
    const tarjetasResult = await queryWithLog("SELECT * FROM tarjetas WHERE web = true ORDER BY orden");
    const tempsJuntsResult = await queryWithLog("SELECT * FROM tempsjunts WHERE web = true ORDER BY fecha DESC");
    const seriesResult = await queryWithLog("SELECT * FROM series WHERE web = true ORDER BY orden");
    const videosResult = await queryWithLog("SELECT * FROM videos WHERE web = true ORDER BY fecha DESC");

    res.render("index", {
      titulo: "Resumen",
      sliders1: sliders1Result.rows,
      sliders2: sliders2Result.rows,
      actividades: actividadesResult.rows,
      tarjetas: tarjetasResult.rows,
      tempsJunts: tempsJuntsResult.rows,
      series: seriesResult.rows,
      videos: videosResult.rows,
    });

  } catch (error) {
    console.error('Error en la ruta principal:', error);
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

router.get('/algunaruta', async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM algunatabla');
    res.json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
