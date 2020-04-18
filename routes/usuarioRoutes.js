// REQUIRES
// Importación de librerias, propias o de terceros, que se utilizan en el proyecto
const express = require('express');

// Importar el Controller
const usuarioC = require('../controllers/usuarioCtrl');

// Importar middlewares
const autenticacionM = require('../middlewares/autenticacionMdlw');

// Inicializar variables
// Aqui voy a usar la libreria e inicializar mi app
const app = express();

// Rutas
// ======================================
// Obtener todos los usuarios
app.get('/', usuarioC.userFindAll);
// Obtener todos los usuarios paginados
app.get('/paged', usuarioC.userGetPaged);
// ======================================
// Crear usuarios
app.post('/', autenticacionM.verificaToken, usuarioC.userInsert);
// ======================================
// Crear usuarios
app.put('/:id', autenticacionM.verificaToken, usuarioC.userUpdate);
// ======================================
// Crear usuarios
app.delete('/:id', autenticacionM.verificaToken, usuarioC.userDelete);

// exportar el modulo para poder utilizarlo en otras partes
module.exports = app;