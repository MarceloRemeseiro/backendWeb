const express = require("express");
const router = express.Router();
const { prisma } = require("../../prisma/prisma"); // Importar prisma
const cloudinary = require("../utils/cloudinaryConecction");

router.get("/actividades", async (req, res) => {
  try {
    const actividades = await prisma.actividades.findMany(); // Utilizar prisma para recuperar todas las actividades
    res.render("actividades", {
      actividades: actividades,
      titulo: "Actividades",
      tituloPagina: "Actividades de la Iglesia",
    }); // Renderizar actividades.ejs y pasar las actividades a la plantilla
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al recuperar las Actividades"); // Enviar un mensaje de error como respuesta
  }
});

router.post("/actividades", async (req, res) => {
  try {
    const { titulo, textoTarjeta, imagen, boton, texto, orden, web } = req.body;
    const nuevaActividad = await prisma.actividades.create({
      data: {
        titulo,
        textoTarjeta,
        imagen,
        boton: boton === "on" ? true : false,
        web: web === "on" ? true : false,
        texto,
        orden: parseInt(orden),
      },
    });

    res.redirect("/actividades"); // Redirigir al cliente de nuevo a la página de actividades
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).send("Error al crear la Actividad"); // Enviar un mensaje de error como respuesta
  }
});

router.delete("/actividades/delete/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.actividades.delete({
      where: {
        id: id,
      },
    });
    res.redirect("/actividades");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la Actividad");
  }
});

router.get("/actividades/edit/:id", async (req, res) => {
  const serie = await prisma.actividades.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(serie);
});

router.put("/actividades/update/:id", async (req, res) => {
  const { titulo, textoTarjeta, imagen, boton, texto, orden, web } = req.body;
  const updatedActividades = await prisma.actividades.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      titulo,
      textoTarjeta,
      imagen,
      boton,
      web,
      texto,
      orden: parseInt(orden),
    },
  });
  res.redirect("/actividades");
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
