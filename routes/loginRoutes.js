const express = require('express');
const app = express();
const loginC = require('../controllers/loginCtrl');

// Login
app.post('/', loginC.login);
// Login peticion recuperar contraseña
app.post('/recover', loginC.recoverPass);
// Login peticion cambiar contraseña
app.post('/reset', loginC.resetPass);

module.exports = app;