// importar libreria
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// declarar Schema
const Schema = mongoose.Schema;

const rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol permitido.'
};

// Crear el schema usuario con los campos de la BD y sus restricciones
const usuarioSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  email: { type: String, unique: true, required: [true, 'El email es necesario'] },
  password: { type: String, required: [true, 'La contraseña es necesaria'] },
  img: { type: String, required: false },
  role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
  resetPassToken: { type: String, required: false },
  resetPassExpires: { type: Date, required: false }
});

// https://medium.com/mesan-digital/tutorial-3b-how-to-add-password-reset-to-your-node-js-authentication-api-using-sendgrid-ada54c8c0d1f
usuarioSchema.methods.generatePasswordReset = function() {
  this.resetPassToken = crypto.randomBytes(20).toString('hex');
  this.resetPassExpires = Date.now() + 3600000; //expires in an hour
};

// Registrar en el usuarioSchema el pugin: mongoose-unique-validator, con un mensaje personalizado para cada campo: {PATH}
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

// exportar el modulo para poder utilizarlo en otras partes
module.exports = mongoose.model('Usuario', usuarioSchema);