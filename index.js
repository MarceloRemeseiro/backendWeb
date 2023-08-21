const express = require("express");
const indexRoutes = require("./src/routes/rutas.routes");
const seriesRouter = require('./src/routes/series.routes');
const actividadesRouter = require('./src/routes/actividades.routes');
const slider1Router = require('./src/routes/slider1.routes');
const slider2Router = require('./src/routes/slider2.routes');
const tarjetasRouter = require('./src/routes/tarjetas.routes');
const tempsJuntsRouter = require('./src/routes/tempsJunts.routes');
const endpointRouter = require('./src/routes/endpoints.routes');

const path = require("path");
const app = express();
require('dotenv').config();



app.use(express.json());
app.set("port", 4000);
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/src/public")));
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes

app.use('/api',endpointRouter);


app.use('/', indexRoutes);
app.use('/',seriesRouter);
app.use('/',actividadesRouter);
app.use('/',slider1Router);
app.use('/',slider2Router);
app.use('/',tarjetasRouter);
app.use('/',tempsJuntsRouter);









app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
