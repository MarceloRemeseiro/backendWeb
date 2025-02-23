const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinaryConecction");
const { queryWithLog } = require("../db/db");

router.get("/actividades", async (req, res) => {
  try {
    const result = await queryWithLog("SELECT * FROM actividades");
    res.render("actividades", {
      actividades: result.rows,
      titulo: "Actividades",
      tituloPagina: "Actividades de la Iglesia",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las Actividades");
  }
});

router.post("/actividades", async (req, res) => {
  try {
    const { titulo, textotarjeta, imagen, boton, texto, orden, web } = req.body;
    await queryWithLog(
      "INSERT INTO actividades (titulo, \"textotarjeta\", imagen, boton, texto, orden, web) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        titulo,
        textotarjeta,
        imagen,
        boton === "on" ? true : false,
        texto,
        parseInt(orden),
        web === "on" ? true : false,
      ]
    );
    res.redirect("/actividades");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la Actividad");
  }
});

router.delete("/actividades/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await queryWithLog("DELETE FROM actividades WHERE id = $1", [id]);
    res.redirect("/actividades");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la Actividad");
  }
});

router.get("/actividades/edit/:id", async (req, res) => {
  try {
    const result = await queryWithLog(
      "SELECT * FROM actividades WHERE id = $1",
      [parseInt(req.params.id)]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la Actividad");
  }
});

router.put("/actividades/update/:id", async (req, res) => {
  try {
    const { titulo, textotarjeta, imagen, boton, texto, orden, web } = req.body;
    await queryWithLog(
      "UPDATE actividades SET titulo = $1, \"textotarjeta\" = $2, imagen = $3, boton = $4, texto = $5, orden = $6, web = $7 WHERE id = $8",
      [
        titulo,
        textotarjeta,
        imagen,
        boton,
        texto,
        parseInt(orden),
        web,
        parseInt(req.params.id)
      ]
    );
    res.redirect("/actividades");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la Actividad");
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
