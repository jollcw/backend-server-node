// Importar Librerias
const express = require('express');
// Importar Controlador
const medicoC = require('../controllers/medicoCtrl');
// Importar Middlewares
const autenticationM = require('../middlewares/autenticacionMdlw');
// Inicializar las variables
const app = express();

// Rutas
app.get('/', medicoC.medicoGet);
app.post('/', autenticationM.verificaToken, medicoC.medicoInsert);
app.put('/:id', autenticationM.verificaToken, medicoC.medicoEdit);
app.delete('/:id', autenticationM.verificaToken, medicoC.medicoDelete);

module.exports = app;