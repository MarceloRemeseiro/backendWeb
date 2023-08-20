const express = require("express");
const router = express.Router();
const { prisma } = require("../../prisma/prisma"); // Importar prisma
const cloudinary = require("../utils/cloudinaryConecction");

// Recuperar todas las series y renderizarlas en series.ejs
router.get("/series", async (req, res) => {
  try {
    const series = await prisma.series.findMany(); // Utilizar prisma para recuperar todas las series
    res.render("series", {
      series: series,
      titulo: "Series",
      tituloPagina: "Series de Youtube",
    }); // Renderizar series.ejs y pasar las series a la plantilla
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al recuperar las series"); // Enviar un mensaje de error como respuesta
  }
});

router.post("/series", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, link, web, orden } = req.body;
    const newSerie = await prisma.series.create({
      data: {
        titulo,
        subtitulo,
        imagen,
        link,
        web: web === "on" ? true : false,
        orden: parseInt(orden),
      },
    });

    res.redirect("/series"); // Redirigir al cliente de nuevo a la página de series
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al crear la serie"); // Enviar un mensaje de error como respuesta
  }
});

router.delete("/series/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.series.delete({
      where: {
        id: id,
      },
    });
    res.redirect("/series");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la serie");
  }
});

router.get("/series/edit/:id", async (req, res) => {
  const serie = await prisma.series.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(serie);
});

router.put("/series/update/:id", async (req, res) => {
  const { titulo, subtitulo, imagen, link, web, orden } = req.body;
  const updatedSerie = await prisma.series.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      titulo,
      subtitulo,
      imagen,
      link,
      web,
      orden: parseInt(orden),

    },
  });
  res.redirect("/series");
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
