// Importar librerias
const express = require('express');
// Importar Controlador
const imgC = require('../controllers/imagenesCtrl');
// Import middlewares
const autenticationM = require('../middlewares/autenticacionMdlw');
// Inicializar variables
const app = express();

// app.get('/', imgC.imgPath);
app.get('/:tipo/:img',imgC.imgPath);
// app.get('/:tipo/:img', autenticationM.verificaToken, imgC.imgPath);

module.exports = app;