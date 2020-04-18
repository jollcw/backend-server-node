// REQUIRES
// Importación de librerias, propias o de terceros, que se utilizan en el proyecto
const express = require('express');

// Importar el controller
const appC = require('../controllers/appCtrl');

const { handleError, ErrorHandler } = require('../helpers/error');

// Inicializar variables
// Aqui voy a usar la libreria e inicializar mi app
const app = express();

// Middleware de manejo de errors
app.use((err, req, res, next) => {
  handleError(err, res);
});

// Rutas
// Ruta de prueba general
app.get('/', appC.appDefault);
// Ruta de prueba del error
app.get('/error', (req, res) => {
  throw new ErrorHandler(500, 'Internal server error');
});

// exportar el modulo para poder utilizarlo en otras partes
module.exports = app;