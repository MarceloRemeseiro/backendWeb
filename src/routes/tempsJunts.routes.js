const express = require("express");
const router = express.Router();
const pool = require("../db/db"); // Importar la conexión a la base de datos
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/tempsJunts", async (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect("/login");
  }
  try {
    const [tempsJunts] = await pool.query('SELECT * FROM tempsjunts');
    res.render("tempsJunts", {
      tempsJunts: tempsJunts,
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
    await pool.query(
      'INSERT INTO tempsjunts (titulo, subtitulo, fecha, imagen, link, web, texto) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titulo, subtitulo, new Date(fecha), imagen, link, web === "on" ? true : false, texto]
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
    await pool.query('DELETE FROM tempsjunts WHERE id = ?', [id]);
    res.redirect("/tempsJunts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar tempsJunts");
  }
});

router.get("/tempsJunts/edit/:id", async (req, res) => {
  try {
    const [tempsjunts] = await pool.query('SELECT * FROM tempsjunts WHERE id = ?', [parseInt(req.params.id)]);
    res.json(tempsjunts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar tempsJunts");
  }
});

router.put("/tempsJunts/update/:id", async (req, res) => {
  try {
    const { titulo, subtitulo, fecha, imagen, link, texto, web } = req.body;
    await pool.query(
      'UPDATE tempsjunts SET titulo = ?, subtitulo = ?, fecha = ?, imagen = ?, link = ?, web = ?, texto = ? WHERE id = ?',
      [titulo, subtitulo, new Date(fecha), imagen, link, web, texto, parseInt(req.params.id)]
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
