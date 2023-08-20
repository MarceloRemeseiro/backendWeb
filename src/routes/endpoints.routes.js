const express = require("express");
const router = express.Router();
const { prisma } = require("../../prisma/prisma"); // Importar prisma


router.get("/series", async (req, res) => {
  const series = await prisma.series.findMany({
    where: {
      web: true,
    },
  });
  res.json(series);
});

router.get("/actividades", async (req, res) => {
  const actividades = await prisma.actividades.findMany({
    where: {
      web: true,
    },
  });
  res.json(actividades);
});

router.get("/slider1", async (req, res) => {
  const slider1 = await prisma.slider1.findMany({
    where: {
      web: true,
    },
  });
  res.json(slider1);
});

router.get("/slider2", async (req, res) => {
  const slider2 = await prisma.slider2.findMany({
    where: {
      web: true,
    },
  });
  res.json(slider2);
});

router.get("/tarjetas", async (req, res) => {
  const tarjetas = await prisma.tarjetas.findMany({
    where: {
      web: true,
    },
  });
  res.json(tarjetas);
});

router.get("/tempsJunts", async (req, res) => {
  const tempsJunts = await prisma.tempsJunts.findMany({
    where: {
      web: true,
    },
  });
  res.json(tempsJunts);
});


module.exports = router; // Exportar el router