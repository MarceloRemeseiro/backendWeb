const express = require("express");
const router = express.Router();
const { queryWithLog } = require("../db/db");

router.get("/series", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM series WHERE web = true');
    const seriesFormatted = result.rows.map(serie => {
      const { web, ...otherProps } = serie;
      return otherProps;
    });
    res.json(seriesFormatted);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las Series");
  }
});

router.get("/actividades", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM actividades WHERE web = true');
    const actividadesFormatted = result.rows.map(actividad => {
      const { web, ...otherProps } = actividad;
      return {
        ...otherProps,
        boton: Boolean(actividad.boton) // En PostgreSQL ya viene como boolean
      };
    });
    res.json(actividadesFormatted);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las Actividades");
  }
});

router.get("/slider1", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM slider1 WHERE web = true');
    const slider1Formatted = result.rows.map(slide => {
      const { web, ...otherProps } = slide;
      return otherProps;
    });
    res.json(slider1Formatted);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar el Slider 1");
  }
});

router.get("/slider2", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM slider2 WHERE web = true');
    const slider2Formatted = result.rows.map(slide => {
      const { web, ...otherProps } = slide;
      return otherProps;
    });
    res.json(slider2Formatted);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar el Slider 2");
  }
});

router.get("/tarjetas", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM tarjetas WHERE web = true');
    const tarjetasFormatted = result.rows.map(tarjeta => {
      const { web, ...otherProps } = tarjeta;
      return otherProps;
    });
    res.json(tarjetasFormatted);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las Tarjetas");
  }
});

router.get("/videos", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM videos WHERE web = true ORDER BY fecha DESC LIMIT 7');
    const videosFormatted = result.rows.map(video => {
      const { web, ...otherProps } = video;
      return otherProps;
    });
    res.json(videosFormatted);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar los Videos");
  }
});

router.get("/tempsJunts", async (req, res) => {
  try {
    const result = await queryWithLog('SELECT * FROM tempsjunts WHERE web = true ORDER BY fecha DESC LIMIT 7');
    const tempsJuntsFormatted = result.rows.map(temps => {
      const { web, ...otherProps } = temps;
      return otherProps;
    });
    res.json(tempsJuntsFormatted);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar los Temps Junts");
  }
});

module.exports = router;
