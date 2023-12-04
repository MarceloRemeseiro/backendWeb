const express = require("express");
const router = express.Router();
const {pool} = require("../db/db"); // Importar la conexión a la base de datos
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/videos", async (req, res) => {
  try {
    const [videos] = await pool.query("SELECT * FROM videos");
    res.render("videos", {
      videos: videos,
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
    await pool.query(
      "INSERT INTO videos (titulo, subtitulo, fecha, imagen, link, web, texto) VALUES (?, ?, ?, ?, ?, ?, ?)",
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
    await pool.query("DELETE FROM videos WHERE id = ?", [id]);
    res.redirect("/videos");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar videos");
  }
});

router.get("/videos/edit/:id", async (req, res) => {
  try {
    const [videos] = await pool.query(
      "SELECT * FROM videos WHERE id = ?",
      [parseInt(req.params.id)]
    );
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar videos");
  }
});

router.put("/videos/update/:id", async (req, res) => {
  try {
    const { titulo, subtitulo, fecha, imagen, link, texto, web } = req.body;
    await pool.query(
      "UPDATE videos SET titulo = ?, subtitulo = ?, fecha = ?, imagen = ?, link = ?, web = ?, texto = ? WHERE id = ?",
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
