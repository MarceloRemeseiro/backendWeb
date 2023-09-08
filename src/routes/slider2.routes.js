const express = require("express");
const router = express.Router();
const pool = require("../db/db"); // Importar la conexión a la base de datos
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/slider2", async (req, res) => {
 
  try {
    const [slider2] = await pool.query('SELECT * FROM slider2');
    res.render("slider2", {
      slider2: slider2,
      titulo: "Slider secundario",
      tituloPagina: "Slider secundario",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las slider2");
  }
});

router.post("/slider2", async (req, res) => {
  try {
    const { imagen, link, web } = req.body;
    await pool.query(
      'INSERT INTO slider2 (imagen, link, web) VALUES (?, ?, ?)',
      [imagen, link, web === "on" ? true : false]
    );
    res.redirect("/slider2");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la serie");
  }
});

router.delete("/slider2/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM slider2 WHERE id = ?', [id]);
    res.redirect("/slider2");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la serie");
  }
});

router.get("/slider2/edit/:id", async (req, res) => {
  try {
    const [serie] = await pool.query('SELECT * FROM slider2 WHERE id = ?', [parseInt(req.params.id)]);
    res.json(serie);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la serie");
  }
});

router.put("/slider2/update/:id", async (req, res) => {
  try {
    const { imagen, link, web } = req.body;
    await pool.query(
      'UPDATE slider2 SET imagen = ?, link = ?, web = ? WHERE id = ?',
      [imagen, link, web, parseInt(req.params.id)]
    );
    res.redirect("/slider2");
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
