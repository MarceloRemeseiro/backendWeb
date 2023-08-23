const express = require("express");
const router = express.Router();
const pool = require("../db/db"); // Importar la conexión a la base de datos
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/slider1", async (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect("/login");
  }
  try {
    const [slider1] = await pool.query('SELECT * FROM slider1');
    res.render("slider1", {
      slider1: slider1,
      titulo: "Slider Principal",
      tituloPagina: "Slider Principal",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las slider1");
  }
});

router.post("/slider1", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, link, web } = req.body;
    await pool.query(
      'INSERT INTO slider1 (titulo, subtitulo, imagen, link, web) VALUES (?, ?, ?, ?, ?)',
      [titulo, subtitulo, imagen, link, web === "on" ? true : false]
    );
    res.redirect("/slider1");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la serie");
  }
});

router.delete("/slider1/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM slider1 WHERE id = ?', [id]);
    res.redirect("/slider1");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la serie");
  }
});

router.get("/slider1/edit/:id", async (req, res) => {
  try {
    const [serie] = await pool.query('SELECT * FROM slider1 WHERE id = ?', [parseInt(req.params.id)]);
    res.json(serie);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la serie");
  }
});

router.put("/slider1/update/:id", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, link, web } = req.body;
    await pool.query(
      'UPDATE slider1 SET titulo = ?, subtitulo = ?, imagen = ?, link = ?, web = ? WHERE id = ?',
      [titulo, subtitulo, imagen, link, web, parseInt(req.params.id)]
    );
    res.redirect("/slider1");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la serie");
  }
});

router.get("/api/images", async (req, res) => {
  try {
    const cursor = req.query.cursor;
    const search = cloudinary.search
      .sort_by("public_id", "desc")
      .max_results(30);

    if (cursor) {
      search.next_cursor(cursor);
    }

    const result = await search.execute();
    const images = result.resources;

    res.json({
      images: images,
      nextCursor: result.next_cursor,
    });
  } catch (error) {
    res.status(500).send("Error al obtener las imágenes");
  }
});

module.exports = router;
