const express = require("express");
const router = express.Router();
const { prisma } = require("../../prisma/prisma"); // Importar prisma
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/tempsJunts", async (req, res) => {
  try {
    const tempsJunts = await prisma.tempsJunts.findMany(); // Utilizar prisma para recuperar todas las tempsJunts
    res.render("tempsJunts", {
      tempsJunts: tempsJunts,
      titulo: "Temps Junts",
      tituloPagina: "Temps Junts",
    }); // Renderizar tempsJunts.ejs y pasar las tempsJunts a la plantilla
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al recuperar tempsJunts"); // Enviar un mensaje de error como respuesta
  }
});

router.post("/tempsJunts", async (req, res) => {
  try {
    const { titulo, subtitulo, fecha, imagen, link, texto, orden, web } =
      req.body;
    const nuevaTempsjunts = await prisma.tempsJunts.create({
      data: {
        titulo,
        subtitulo,
        fecha: new Date(fecha),
        imagen,
        link,
        web: web === "on" ? true : false,
        texto,
      },
    });

    res.redirect("/tempsJunts"); // Redirigir al cliente de nuevo a la página de tempsJunts
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al crear tempsJunts"); // Enviar un mensaje de error como respuesta
  }
});

router.delete("/tempsJunts/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.tempsJunts.delete({
      where: {
        id: id,
      },
    });
    res.redirect("/tempsJunts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar tempsJunts");
  }
});

router.get("/tempsJunts/edit/:id", async (req, res) => {
  const serie = await prisma.tempsJunts.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(serie);
});

router.put("/tempsJunts/update/:id", async (req, res) => {
  const { titulo, subtitulo, fecha, imagen, link, texto, web } = req.body;
  const updatedtempsJunts = await prisma.tempsJunts.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      titulo,
      subtitulo,
      fecha: new Date(fecha),
      imagen,
      link,
      web,
      texto,
    },
  });
  res.redirect("/tempsJunts");
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
