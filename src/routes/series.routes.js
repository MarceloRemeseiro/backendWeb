const express = require("express");
const router = express.Router();
const { queryWithLog } = require("../db/db");
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/series", async (req, res) => {
  try {
    const result = await queryWithLog("SELECT * FROM series");
    res.render("series", {
      series: result.rows,
      titulo: "Series",
      tituloPagina: "Series de Youtube",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las series");
  }
});

router.post("/series", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, link, web, orden } = req.body;
    await queryWithLog(
      "INSERT INTO series (titulo, subtitulo, imagen, link, web, orden) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        titulo,
        subtitulo,
        imagen,
        link,
        web === "on" ? true : false,
        parseInt(orden),
      ]
    );
    res.redirect("/series");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la serie");
  }
});

router.delete("/series/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await queryWithLog("DELETE FROM series WHERE id = $1", [id]);
    res.redirect("/series");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la serie");
  }
});

router.get("/series/edit/:id", async (req, res) => {
  try {
    const result = await queryWithLog(
      "SELECT * FROM series WHERE id = $1",
      [parseInt(req.params.id)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la serie");
  }
});

router.put("/series/update/:id", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, link, web, orden } = req.body;
    await queryWithLog(
      "UPDATE series SET titulo = $1, subtitulo = $2, imagen = $3, link = $4, web = $5, orden = $6 WHERE id = $7",
      [
        titulo,
        subtitulo,
        imagen,
        link,
        web,
        parseInt(orden),
        parseInt(req.params.id),
      ]
    );
    res.redirect("/series");
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
