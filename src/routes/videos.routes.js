const express = require("express");
const router = express.Router();
const { queryWithLog } = require("../db/db"); // Cambiamos para usar queryWithLog
const cloudinary = require("../utils/cloudinaryConecction");


router.get("/videos", async (req, res) => {
  try {
    const result = await queryWithLog("SELECT * FROM videos ORDER BY fecha DESC LIMIT 7");
    res.render("videos", {
      videos: result.rows,
      titulo: "Videos de youtube",
      tituloPagina: "Videos de youtube",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar videos");
  }
});

router.post("/videos", async (req, res) => {
  try {
    const { titulo, subtitulo, fecha, imagen, link, texto, web } = req.body;
    await queryWithLog(
      "INSERT INTO videos (titulo, subtitulo, fecha, imagen, link, web, texto) VALUES ($1, $2, $3, $4, $5, $6, $7)",
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
    res.redirect("/videos");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear videos");
  }
});

router.delete("/videos/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await queryWithLog("DELETE FROM videos WHERE id = $1", [id]);
    res.redirect("/videos");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar videos");
  }
});

router.get("/videos/edit/:id", async (req, res) => {
  try {
    const result = await queryWithLog(
      "SELECT * FROM videos WHERE id = $1",
      [parseInt(req.params.id)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar videos");
  }
});

router.put("/videos/update/:id", async (req, res) => {
  try {
    const { titulo, subtitulo, fecha, imagen, link, texto, web } = req.body;
    await queryWithLog(
      "UPDATE videos SET titulo = $1, subtitulo = $2, fecha = $3, imagen = $4, link = $5, web = $6, texto = $7 WHERE id = $8",
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
    res.redirect("/videos");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar videos");
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
