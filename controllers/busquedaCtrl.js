// Importar el Modelo
const Usuario = require('../models/usuarioModel');
const Medico = require('../models/medicoModel');
const Hospital = require('../models/hospitalModel');

const busquedaC = {
  busquedaDefault: (req, res, next) => {
    res.status(200).json({
      ok: true,
      mensaje: 'Peticion realizada correctamente'
   });
  }
};

module.exports = busquedaC;