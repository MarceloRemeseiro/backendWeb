const express = require("express");
const router = express.Router();
const pool = require("../db/db"); // Importar la conexión a la base de datos
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/tarjetas", async (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect("/login");
  }
  try {
    const [tarjetas] = await pool.query('SELECT * FROM tarjetas');
    res.render("tarjetas", {
      tarjetas: tarjetas,
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
    await pool.query(
      'INSERT INTO tarjetas (titulo, subtitulo, imagen, texto, web, link) VALUES (?, ?, ?, ?, ?, ?)',
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
    await pool.query('DELETE FROM tarjetas WHERE id = ?', [id]);
    res.redirect("/tarjetas");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la tarjeta");
  }
});

router.get("/tarjetas/edit/:id", async (req, res) => {
  try {
    const [tarjeta] = await pool.query('SELECT * FROM tarjetas WHERE id = ?', [parseInt(req.params.id)]);
    res.json(tarjeta);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la tarjeta");
  }
});

router.put("/tarjetas/update/:id", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, texto, web, link } = req.body;
    await pool.query(
      'UPDATE tarjetas SET titulo = ?, subtitulo = ?, imagen = ?, texto = ?, web = ?, link = ? WHERE id = ?',
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
