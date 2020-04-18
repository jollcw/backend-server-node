// Importar librerias
const express = require('express');
// Importar Controlador
const hospitalC = require('../controllers/hospitalCtrl');
// Import middlewares
const autenticationM = require('../middlewares/autenticacionMdlw');
// Inicializar variables
const app = express();

app.get('/', hospitalC.hospitalGet);
app.get('/details', hospitalC.hospitalGetDetails);
app.post('/', autenticationM.verificaToken, hospitalC.hospitalInsert);
app.put('/:id', autenticationM.verificaToken, hospitalC.hospitalUpdate);
app.delete('/:id', autenticationM.verificaToken, hospitalC.hospitalDelte);

module.exports = app;