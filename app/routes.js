// Declaracion de variables y exportacion de los metodos que utiliza routerx`
var express = require("express");
var router = express.Router();
const config = require("./config");

//Exportacion de metodos utilizados en routes.js para guardar gets y posts
module.exports = router;

//Get home
router.get("/", (req, res) => {
  res.render("home");
});

//Insertar nuevo registro de persona
router.post("/api/personas", (req, res) => {
  let persona = new Persona();
  persona.ApellidoPaterno = req.body.aP;
  persona.picture = req.body.aM;
  persona.price = req.body.price;
  persona.category = req.body.category;
  persona.description = req.body.description;

  console.log("Nuevo guardado");
  console.log(req.body);

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
router.post("/api/product/personaCurp", (req, res) => {
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
router.get("/api/product/:personaCurp", (req, res) => {
  // Incluye la busqueda para definir el registro indicado
  let personaCurp = req.params.personaCurp;
  Persona.find(personaCurp, (err, products) => {
    if (err)
      return res
        .status(500)
        .send({ message: "Error al realizar la peticion: " + err });
    if (!products)
      return res.status(404).send({ message: "El producto no existe" });
    res.render("editar", { products });
  });
});

//Metodo para borrar un registro
router.delete("/api/product/:personaCurp", (req, res) => {
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


