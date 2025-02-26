const express = require("express");
const app = express();
const { initDb } = require('./src/db/db');
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const { verifyToken } = require('./src/utils/auth');
const authRoutes = require('./src/routes/auth.routes');
const indexRoutes = require("./src/routes/rutas.routes");
const seriesRouter = require("./src/routes/series.routes");
const videosRouter = require("./src/routes/videos.routes");
const actividadesRouter = require("./src/routes/actividades.routes");
const slider1Router = require("./src/routes/slider1.routes");
const slider2Router = require("./src/routes/slider2.routes");
const tarjetasRouter = require("./src/routes/tarjetas.routes");
const tempsJuntsRouter = require("./src/routes/tempsJunts.routes");
const endpointRouter = require("./src/routes/endpoints.routes");

// Settings
app.set("port", 4000);
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "src/public")));
app.use(express.urlencoded({ extended: true }));

// Rutas públicas
app.use("/api", endpointRouter);
app.use("/auth", authRoutes);

// Rutas protegidas
app.use("/", verifyToken, indexRoutes);
app.use("/", verifyToken, seriesRouter);
app.use("/", verifyToken, videosRouter);
app.use("/", verifyToken, actividadesRouter);
app.use("/", verifyToken, slider1Router);
app.use("/", verifyToken, slider2Router);
app.use("/", verifyToken, tarjetasRouter);
app.use("/", verifyToken, tempsJuntsRouter);

// Inicializar la base de datos y arrancar el servidor
initDb().then(() => {
  app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
  });
}).catch(err => {
  console.error("Error initializing database:", err);
});
