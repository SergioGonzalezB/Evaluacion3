// Declaracion de variables y exportacion de los metodos que utiliza router
var express = require("express");
var generaCurp = require("./curp");
var router = express.Router();
const config = require("../config");
const Persona = require("../models/Persona"); //cargar modulo del modelo

//Exportacion de metodos utilizados en routes.js para guardar gets y posts
module.exports = router;

//Get home
router.get("/", (req, res) => {
  res.render("home");
});

//Get registro
router.get("/api/registro", (req, res) => {
  res.render("registro");
});

//Insertar nuevo registro de persona
router.post("/api/registro", (req, res) => {
  let persona = new Persona();

  //Guarda la fecha de nacimiento para usarla como arreglo
  var fecha = req.body.dateBrt;

  //Los 2 ultimos digitos del año
  var year = fecha[0].concat(fecha[1]) + fecha[2].concat(fecha[3]);
  //Dos digitos del mes
  var month = fecha[5].concat(fecha[6]);
  //Dos digitos del dia
  var day = fecha[8].concat(fecha[9]);

  //Se obtienen los datos de la forma usando el atributo name de cada input
  var apellido_paterno = req.body.lname1;
  var apellido_materno = req.body.lname2;
  var nombre = req.body.name;
  var fecha_nacimiento = [day, month, year];
  var sexo = req.body.sexo;
  var estado = req.body.estado;

  //Se utiliza la funcion calcula() del archivo rfc.js
  var calculado = generaCurp({
    nombre,
    apellido_paterno,
    apellido_materno,
    sexo,
    estado,
    fecha_nacimiento,
  });

  persona.ApellidoPaterno = apellido_paterno;
  persona.ApellidoMaterno = apellido_materno;
  persona.Nombre = nombre;
  persona.FechaNacimiento = fecha_nacimiento;
  persona.Sexo = sexo;
  persona.Estado = estado;
  persona.Curp = calculado;

  persona.save((err, personaStored) => {
    if (err) res.status(500).send({ message: "Error al guardar en BD:" + err });
    res.redirect("/api/personas");
  });
});

//Get para mostrar los registros de personas
router.get("/api/personas", (req, res) => {
  Persona.find({}, (err, personas) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Error al realizar la peticion:" + err });
    if (!personas)
      return res.status(404).send({ message: "No existen productos" });
    res.render("personas", { personas });
  });
});

//Busqueda por CURP
router.post("/api/persona/personaCurp", (req, res) => {
  var buscaCURP = req.body.curpbusca;

  Persona.find({ CURP: buscaCURP }, (err, personas) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la busqueda: ${err}` });

    if (!personas)
      return res.status(404).send({ message: "El registro no existe" });

    res.render("personas", { personas });
  });
});

//Get para mostrar persona en editar
router.get("/api/persona/:personaCurp", (req, res) => {
  // Incluye la busqueda para definir el registro indicado
  let personaCurp = req.params.personaCurp;
  Persona.find(personaCurp, (err, personas) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Error al realizar la peticion: " + err });
    if (!personas)
      return res.status(404).send({ message: "El producto no existe" });
    res.render("persona", { personas });
  });
});

//Metodo para borrar un registro
router.delete("/api/persona/:personaCurp", (req, res) => {
  let personaCurp = req.params.personaCurp;
  Persona.find(personaCurp, (err, product) => {
    persona.remove((err) => {
      if (err)
        res
          .status(500)
          .send({ message: `Error al borrar el registro: ${err}` });
      res.redirect("/api/personas");
    });
  });
});
