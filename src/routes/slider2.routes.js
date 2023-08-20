const express = require("express");
const router = express.Router();
const { prisma } = require("../../prisma/prisma"); // Importar prisma
const cloudinary = require("../utils/cloudinaryConecction");

// Recuperar todas las series y renderizarlas en series.ejs
router.get("/slider2", async (req, res) => {
  try {
    const slider2 = await prisma.slider2.findMany(); // Utilizar prisma para recuperar todas las slider2
    res.render("slider2", {
      slider2: slider2,
      titulo: "Slider secundario",
      tituloPagina: "Slider secundario",
    }); // Renderizar slider2.ejs y pasar las slider2 a la plantilla
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al recuperar las slider2"); // Enviar un mensaje de error como respuesta
  }
});

router.post("/slider2", async (req, res) => {
  try {
    const { imagen, link, web } = req.body;
    const newSerie = await prisma.slider2.create({
      data: {
        imagen,
        link,
        web: web === "on" ? true : false,
      },
    });

    res.redirect("/slider2"); // Redirigir al cliente de nuevo a la página de slider2
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al crear la serie"); // Enviar un mensaje de error como respuesta
  }
});

router.delete("/slider2/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.slider2.delete({
      where: {
        id: id,
      },
    });
    res.redirect("/slider2");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la serie");
  }
});

router.get("/slider2/edit/:id", async (req, res) => {
  const serie = await prisma.slider2.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(serie);
});

router.put("/slider2/update/:id", async (req, res) => {
  const { imagen, link, web } = req.body;
  const updatedSerie = await prisma.slider2.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      imagen,
      link,
      web,
    },
  });
  res.redirect("/slider2");
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
