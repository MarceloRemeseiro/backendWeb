const express = require("express");
const router = express.Router();
const { prisma } = require("../../prisma/prisma"); // Importar prisma
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/tarjetas", async (req, res) => {
  try {
    const tarjetas = await prisma.tarjetas.findMany(); // Utilizar prisma para recuperar todas las tarjetas
    res.render("tarjetas", {
      tarjetas: tarjetas,
      titulo: "Tarjetas",
      tituloPagina: "Tarjetas de la web",
    }); // Renderizar tarjetas.ejs y pasar las tarjetas a la plantilla
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al recuperar las tarjetas"); // Enviar un mensaje de error como respuesta
  }
});

router.post("/tarjetas", async (req, res) => {
  try {
    const { titulo, subtitulo, imagen, texto, web, link } = req.body;
    const nuevaTarjeta = await prisma.tarjetas.create({
      data: {
        titulo,
        subtitulo,
        imagen,
        texto,
        link,
        web: web === "on" ? true : false,
      },
    });

    res.redirect("/tarjetas"); // Redirigir al cliente de nuevo a la página de tarjetas
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al crear la tarjeta"); // Enviar un mensaje de error como respuesta
  }
});

router.delete("/tarjetas/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.tarjetas.delete({
      where: {
        id: id,
      },
    });
    res.redirect("/tarjetas");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la tarjeta");
  }
});

router.get("/tarjetas/edit/:id", async (req, res) => {
  const serie = await prisma.tarjetas.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(serie);
});

router.put("/tarjetas/update/:id", async (req, res) => {
  const { titulo, subtitulo ,imagen,  texto,  web, link } = req.body;
  const updatedtarjetas = await prisma.tarjetas.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      titulo,
      subtitulo,
      imagen,
      texto,
      web,
      link,
    },
  });
  res.redirect("/tarjetas");
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
