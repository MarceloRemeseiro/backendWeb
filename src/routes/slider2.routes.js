const express = require("express");
const router = express.Router();
const { queryWithLog } = require("../db/db");
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/slider2", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM slider2');
    res.render("slider2", {
      slider2: result.rows,
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
    await queryWithLog(
      'INSERT INTO slider2 (imagen, link, web) VALUES ($1, $2, $3)',
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
    await queryWithLog('DELETE FROM slider2 WHERE id = $1', [id]);
    res.redirect("/slider2");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la serie");
  }
});

router.get("/slider2/edit/:id", async (req, res) => {
  try {
    const result = await queryWithLog(
      'SELECT * FROM slider2 WHERE id = $1',
      [parseInt(req.params.id)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la serie");
  }
});

router.put("/slider2/update/:id", async (req, res) => {
  try {
    const { imagen, link, web } = req.body;
    await queryWithLog(
      'UPDATE slider2 SET imagen = $1, link = $2, web = $3 WHERE id = $4',
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
