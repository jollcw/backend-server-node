// REQUIRES
// Importación de librerias, propias o de terceros, que se utilizan en el proyecto
const express = require('express');
const fileUpload = require('express-fileupload');

// Importar el controller
const uploadC = require('../controllers/uploadCtrl');

// Inicializar variables
// Aqui voy a usar la libreria e inicializar mi app
const app = express();

// default options
app.use(fileUpload());

// Rutas
app.get('/prova', uploadC.uploadProva);
app.post('/:tipo/:id', uploadC.uploadImg);

module.exports = app;