const express = require("express");
const router = express.Router();
const { queryWithLog } = require("../db/db");
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/slider1", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM slider1');
    res.render("slider1", {
      slider1: result.rows,
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
    await queryWithLog(
      'INSERT INTO slider1 (titulo, subtitulo, imagen, link, web) VALUES ($1, $2, $3, $4, $5)',
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
    await queryWithLog('DELETE FROM slider1 WHERE id = $1', [id]);
    res.redirect("/slider1");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la serie");
  }
});

router.get("/slider1/edit/:id", async (req, res) => {
  try {
    const result = await queryWithLog(
      'SELECT * FROM slider1 WHERE id = $1',
      [parseInt(req.params.id)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la serie");
  }
});

router.put("/slider1/update/:id", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, link, web } = req.body;
    await queryWithLog(
      'UPDATE slider1 SET titulo = $1, subtitulo = $2, imagen = $3, link = $4, web = $5 WHERE id = $6',
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
