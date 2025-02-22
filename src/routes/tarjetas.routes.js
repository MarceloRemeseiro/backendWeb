const express = require("express");
const router = express.Router();
const { queryWithLog } = require("../db/db");
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/tarjetas", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM tarjetas');
    res.render("tarjetas", {
      tarjetas: result.rows,
      titulo: "Tarjetas",
      tituloPagina: "Tarjetas de la web",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las tarjetas");
  }
});

router.post("/tarjetas", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, texto, web, link } = req.body;
    await queryWithLog(
      'INSERT INTO tarjetas (titulo, subtitulo, imagen, texto, web, link) VALUES ($1, $2, $3, $4, $5, $6)',
      [titulo, subtitulo, imagen, texto, web === "on" ? true : false, link]
    );
    res.redirect("/tarjetas");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la tarjeta");
  }
});

router.delete("/tarjetas/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await queryWithLog('DELETE FROM tarjetas WHERE id = $1', [id]);
    res.redirect("/tarjetas");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la tarjeta");
  }
});

router.get("/tarjetas/edit/:id", async (req, res) => {
  try {
    const result = await queryWithLog(
      'SELECT * FROM tarjetas WHERE id = $1',
      [parseInt(req.params.id)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la tarjeta");
  }
});

router.put("/tarjetas/update/:id", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, texto, web, link } = req.body;
    await queryWithLog(
      'UPDATE tarjetas SET titulo = $1, subtitulo = $2, imagen = $3, texto = $4, web = $5, link = $6 WHERE id = $7',
      [titulo, subtitulo, imagen, texto, web, link, parseInt(req.params.id)]
    );
    res.redirect("/tarjetas");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la tarjeta");
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
