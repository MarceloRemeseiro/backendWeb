const express = require("express");
const router = express.Router();
const { prisma } = require("../../prisma/prisma"); // Importar prisma
const cloudinary = require("../utils/cloudinaryConecction");

// Recuperar todas las series y renderizarlas en series.ejs
router.get("/slider1", async (req, res) => {
  try {
    const slider1 = await prisma.slider1.findMany(); // Utilizar prisma para recuperar todas las slider1
    res.render("slider1", {
      slider1: slider1,
      titulo: "Slider Principal",
      tituloPagina: "Slider Principal",
    }); // Renderizar slider1.ejs y pasar las slider1 a la plantilla
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al recuperar las slider1"); // Enviar un mensaje de error como respuesta
  }
});

router.post("/slider1", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, link, web } = req.body;
    const newSerie = await prisma.slider1.create({
      data: {
        titulo,
        subtitulo,
        imagen,
        link,
        web: web === "on" ? true : false,
      },
    });

    res.redirect("/slider1"); // Redirigir al cliente de nuevo a la página de slider1
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al crear la serie"); // Enviar un mensaje de error como respuesta
  }
});

router.delete("/slider1/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.slider1.delete({
      where: {
        id: id,
      },
    });
    res.redirect("/slider1");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la serie");
  }
});

router.get("/slider1/edit/:id", async (req, res) => {
  const serie = await prisma.slider1.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(serie);
});

router.put("/slider1/update/:id", async (req, res) => {
  const { titulo, subtitulo, imagen, link, web } = req.body;
  const updatedSerie = await prisma.slider1.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      titulo,
      subtitulo,
      imagen,
      link,
      web,

    },
  });
  res.redirect("/slider1");
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
