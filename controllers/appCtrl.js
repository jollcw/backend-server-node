// Importar el Modelo

// Importar Mongoose

const appC = {
  appDefault: (req, res, next) => {
    res.status(200).json({
      ok: true,
      mensaje: 'Peticion realizada correctamente'
   });
  }
};

module.exports = appC;