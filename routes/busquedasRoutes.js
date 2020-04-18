// REQUIRES
// Importación de librerias, propias o de terceros, que se utilizan en el proyecto
const express = require('express');

// Importar el controller
const busquedaC = require('../controllers/busquedaCtrl');

// Inicializar variables
// Aqui voy a usar la libreria e inicializar mi app
const app = express();


// Rutas
app.get('/', busquedaC.busquedaDefault);

// exportar el modulo para poder utilizarlo en otras partes
module.exports = app;