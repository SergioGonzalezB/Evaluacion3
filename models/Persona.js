"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurpSchema = Schema({
  ApellidoPaterno: String,
  ApellidoMaterno: String,
  Nombre: String,
  FechaNacimiento: String,
  Sexo: { type: String, enum: ["H", "M"] },
  Estado: {
    type: String,
    enum: [
      "AS",
      "BC",
      "BS",
      "CC",
      "CS",
      "CH",
      "CL",
      "CM",
      "DF",
      "DG",
      "GT",
      "GR",
      "HG",
      "JC",
      "MC",
      "MN",
      "MS",
      "NT",
      "NL",
      "OC",
      "PL",
      "QT",
      "QR",
      "SP",
      "SL",
      "SR",
      "TC",
      "TS",
      "TL",
      "VZ",
      "YN",
      "ZS",
      "NE",
    ],
  },
});

module.exports = mongoose.model("Persona", CurpSchema);
