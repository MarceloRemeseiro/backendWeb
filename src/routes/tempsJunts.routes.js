const express = require("express");
const router = express.Router();
const { queryWithLog } = require("../db/db");
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/tempsJunts", async (req, res) => {
  try {
    const result = await queryWithLog("SELECT * FROM tempsjunts");
    res.render("tempsJunts", {
      tempsJunts: result.rows,
      titulo: "Temps Junts",
      tituloPagina: "Temps Junts",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar tempsJunts");
  }
});

router.post("/tempsJunts", async (req, res) => {
  try {
    const { titulo, subtitulo, fecha, imagen, link, texto, web } = req.body;
    await queryWithLog(
      "INSERT INTO tempsjunts (titulo, subtitulo, fecha, imagen, link, web, texto) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        titulo,
        subtitulo,
        new Date(fecha),
        imagen,
        link,
        web === "on" ? true : false,
        texto,
      ]
    );
    res.redirect("/tempsJunts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear tempsJunts");
  }
});

router.delete("/tempsJunts/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await queryWithLog("DELETE FROM tempsjunts WHERE id = $1", [id]);
    res.redirect("/tempsJunts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar tempsJunts");
  }
});

router.get("/tempsJunts/edit/:id", async (req, res) => {
  try {
    const result = await queryWithLog(
      "SELECT * FROM tempsjunts WHERE id = $1",
      [parseInt(req.params.id)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar tempsJunts");
  }
});

router.put("/tempsJunts/update/:id", async (req, res) => {
  try {
    const { titulo, subtitulo, fecha, imagen, link, texto, web } = req.body;
    await queryWithLog(
      "UPDATE tempsjunts SET titulo = $1, subtitulo = $2, fecha = $3, imagen = $4, link = $5, web = $6, texto = $7 WHERE id = $8",
      [
        titulo,
        subtitulo,
        new Date(fecha),
        imagen,
        link,
        web,
        texto,
        parseInt(req.params.id),
      ]
    );
    res.redirect("/tempsJunts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar tempsJunts");
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
