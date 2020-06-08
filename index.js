"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const config = require("./config");
const app = express();
const method0verride = require("method-override"); //apirest

const Handlebars = require("handlebars"); //variable para cargar Handlebars
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access"); //variable agregada para solucionar problema

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "index",
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars), //esto tambien lo agregue.
  })
);
app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(method0verride("_method"));

//Acceso de archivos en carpeta public
app.use("/static", express.static("public"));

// Retorna una funcion que existe en routes.js como exports
var router = require("./app/routes");

// Recoje los metodos get y post para tenerlos antes del listen
app.use("/", router);

mongoose.set("useFindAndModify", false);
mongoose.connect(config.db, config.urlParser, (err, res) => {
  if (err) {
    return console.log("Error al conectar la BD: " + err);
  } else {
    console.log("Conexion a la BD exitosa");
  }

  app.listen(config.port, () => {
    console.log(`Api se esta ejecutando en http://localhost:${config.port}`);
  });
});
