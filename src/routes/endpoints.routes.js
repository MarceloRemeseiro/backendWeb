const express = require("express");
const router = express.Router();
const {pool} = require("../db/db"); 


router.get("/series", async (req, res) => {
  try {
    const [series] = await pool.query('SELECT * FROM series WHERE web = true');
    const seriesFormatted = series.map(serie => {
      const { web, ...otherProps } = serie;  // Elimina la propiedad web
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
    const [actividades] = await pool.query('SELECT * FROM actividades WHERE web = true');
    const actividadesFormatted = actividades.map(actividad => {
      const { web, ...otherProps } = actividad;  // Elimina la propiedad web
      return {
        ...otherProps,
        boton: actividad.boton === 1
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
    const [slider1] = await pool.query('SELECT * FROM slider1 WHERE web = true');
    const slider1Formatted = slider1.map(slide => {
      const { web, ...otherProps } = slide;  // Elimina la propiedad web
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
    const [slider2] = await pool.query('SELECT * FROM slider2 WHERE web = true');
    const slider2Formatted = slider2.map(slide => {
      const { web, ...otherProps } = slide;  // Elimina la propiedad web
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
    const [tarjetas] = await pool.query('SELECT * FROM tarjetas WHERE web = true');
    const tarjetasFormatted = tarjetas.map(tarjeta => {
      const { web, ...otherProps } = tarjeta;  // Elimina la propiedad web
      return otherProps;
    });
    res.json(tarjetasFormatted);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las Tarjetas");
  }
});

router.get("/tempsJunts", async (req, res) => {
  try {
    const [tempsJunts] = await pool.query('SELECT * FROM tempsjunts WHERE web = true');
    const tempsJuntsFormatted = tempsJunts.map(temps => {
      const { web, ...otherProps } = temps;  // Elimina la propiedad web
      return otherProps;
    });
    res.json(tempsJuntsFormatted);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar los Temps Junts");
  }
});

module.exports = router; // Exportar el router
