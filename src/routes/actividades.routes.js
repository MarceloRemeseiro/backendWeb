const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinaryConecction");
const pool = require("../db/db");

router.get("/actividades", async (req, res) => {
  try {
    const [actividades] = await pool.query('SELECT * FROM actividades');
    res.render("actividades", {
      actividades: actividades,
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
    const { titulo, textoTarjeta, imagen, boton, texto, orden, web } = req.body;
    await pool.query(
      'INSERT INTO actividades (titulo, textoTarjeta, imagen, boton, texto, orden, web) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titulo, textoTarjeta, imagen, boton === "on" ? true : false, texto, parseInt(orden), web === "on" ? true : false]
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
    await pool.query('DELETE FROM actividades WHERE id = ?', [id]);
    res.redirect("/actividades");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la Actividad");
  }
});

router.get("/actividades/edit/:id", async (req, res) => {
  try {
    const [actividad] = await pool.query('SELECT * FROM actividades WHERE id = ?', [parseInt(req.params.id)]);
    res.json(actividad);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la Actividad");
  }
});

router.put("/actividades/update/:id", async (req, res) => {
  try {
    const { titulo, textoTarjeta, imagen, boton, texto, orden, web } = req.body;
    await pool.query(
      'UPDATE actividades SET titulo = ?, textoTarjeta = ?, imagen = ?, boton = ?, texto = ?, orden = ?, web = ? WHERE id = ?',
      [titulo, textoTarjeta, imagen, boton, texto, [parseInt(orden)], web, [parseInt(req.params.id)]]
    );
    res.redirect("/actividades");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar la Actividad");
  }
});


router.get("/api/images", async (req, res) => {
  try {
    const cursor = req.query.cursor; // Obtener el cursor de la URL de la solicitud
    const search = cloudinary.search
      .sort_by("public_id", "desc")
      .max_results(30);

    if (cursor) {
      search.next_cursor(cursor); // Si hay un cursor, úsalo en la búsqueda
    }

    const result = await search.execute();
    const images = result.resources;

    res.json({
      images: images,
      nextCursor: result.next_cursor, // Devuelve el siguiente cursor en la respuesta JSON
    });
  } catch (error) {
    res.status(500).send("Error al obtener las imágenes");
  }
});


module.exports = router; // Exportar el router
