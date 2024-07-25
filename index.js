const express = require("express");
const app = express();
const { initDb } = require('./src/db/db');
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const indexRoutes = require("./src/routes/rutas.routes");
const seriesRouter = require("./src/routes/series.routes");
const videosRouter = require("./src/routes/videos.routes");
const actividadesRouter = require("./src/routes/actividades.routes");
const slider1Router = require("./src/routes/slider1.routes");
const slider2Router = require("./src/routes/slider2.routes");
const tarjetasRouter = require("./src/routes/tarjetas.routes");
const tempsJuntsRouter = require("./src/routes/tempsJunts.routes");
const endpointRouter = require("./src/routes/endpoints.routes");
const { config, ensureAuthenticated } = require("./src/utils/auth");
const { auth } = require("express-openid-connect");

// Settings
app.set("port", 4000);
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/src/public")));
app.use(express.urlencoded({ extended: true }));

app.use(auth(config));
app.use("/api", endpointRouter);

// Rutas protegidas por autenticación
app.use("/", ensureAuthenticated, indexRoutes);
app.use("/", ensureAuthenticated, seriesRouter);
app.use("/", ensureAuthenticated, videosRouter);
app.use("/", ensureAuthenticated, actividadesRouter);
app.use("/", ensureAuthenticated, slider1Router);
app.use("/", ensureAuthenticated, slider2Router);
app.use("/", ensureAuthenticated, tarjetasRouter);
app.use("/", ensureAuthenticated, tempsJuntsRouter);

// Inicializar la base de datos y arrancar el servidor
initDb().then(() => {
  app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
  });
}).catch(err => {
  console.error("Error initializing database:", err);
});
