const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const indexRoutes = require("./src/routes/rutas.routes");
const seriesRouter = require("./src/routes/series.routes");
const actividadesRouter = require("./src/routes/actividades.routes");
const slider1Router = require("./src/routes/slider1.routes");
const slider2Router = require("./src/routes/slider2.routes");
const tarjetasRouter = require("./src/routes/tarjetas.routes");
const tempsJuntsRouter = require("./src/routes/tempsJunts.routes");
const endpointRouter = require("./src/routes/endpoints.routes");
const config = require("./src/utils/auth");
const { auth } = require('express-openid-connect');



//Settings
app.set("port", 3000);
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/src/public")));
app.use(express.urlencoded({ extended: true }));






app.use("/api", endpointRouter);

app.use(auth(config));


//Todo esto de abajo tiene que estar protegido por el login
app.use("/", indexRoutes);
app.use("/", seriesRouter);
app.use("/", actividadesRouter);
app.use("/", slider1Router);
app.use("/", slider2Router);
app.use("/", tarjetasRouter);
app.use("/", tempsJuntsRouter);

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
