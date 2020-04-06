// REQUIRES
// Importación de librerias, propias o de terceros, que se utilizan en el proyecto
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Importar la configuración del SEED
const SEED = require('../config/config').SEED;
// Importar el Modelo
const Usuario = require('../models/usuarioMdl');

const loginC = {
  /**
   * Login en la aplicación
   */
  login: (req, res, next) => {

    let b = req.body;

    Usuario.findOne({email: b.email}, (err, usuarioDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar usuario',
          errors: err
        })
      }

      if (!usuarioDb) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Credenciales incorrectas -EMAIL',
          errors: err
        })
      }
      
      if (!bcrypt.compareSync(b.password, usuarioDb.password)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Credenciales incorrectas -PASS',
          errors: err
        })        
      }
      // Modificar el pass para que no salga en el payload del token
      usuarioDb.password = ':)';
      // Crear el Token
      let token = jwt.sign({usuario: usuarioDb}, SEED, {expiresIn: 14400});

      res.status(200).json({
        ok: true,
        mensaje: 'Login funciona',
        usuario: usuarioDb,
        token: token,
        id: usuarioDb._id
      });

    })
  },
  /**
   * Petición recurperar pass
   * Recibir correo para buscar el usuario
   * Crear un token temporal y 1h de plazo para cambiar el pass
   * Retornar el token temporal para crear el enlace de reset pass
   */
  recoverPass: (req, res, next) => {
    let b = req.body;
    // console.log(b);
    // buscar usuario por correo
    Usuario.findOne({email: b.email}, (err, usuarioDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error en la búsqueda del usuario',
          errors: err
        })
      }

      if (!usuarioDb) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Credenciales incorrectas -EMAIL',
          errors: err
        })
      }
      console.log('usuarioDb', usuarioDb);

      usuarioDb.resetPassToken = null;
      usuarioDb.resetPassExpires = null;

      // Si ok, crear tokenTemp y expireToken
      let tokenTemp = jwt.sign({usuario: usuarioDb}, SEED, {expiresIn: 14400});
      usuarioDb.resetPassToken = tokenTemp;
      usuarioDb.resetPassExpires = Date.now() + 3600000; //expires in an hour

      let usuario = new Usuario(usuarioDb)
      // guardar datos del usuario
      usuario.save((err) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error en el proceso de petición',
            errors: err
          })
        }
        // devolver: tokenTemp para crear resetLink
        res.status(200).json({
          ok: true,
          mensaje: 'Login recoverPass',
          usuario: usuarioDb,
          tokenTemp: tokenTemp,
        });
      })

    })
  },
  /**
   * Actualizar pass, después de la petición
   * recibir correo, newPass, tokenTemp y expireToken
   * Hacer las comprovaciones y actualizar el pass
   */
  resetPass: (req, res, next) => {
    // recibir correo, newPass, tokenTemp y expireToken 
    let b = req.body;
    // console.log(b);
    // f = new Date();
    
    // buscar usuario por correo, tokenTemp y expireToken
    // Usuario.findOne({email: b.email, resetPassToken: b.resetPassToken, resetPassExpires: {$gte:f} }, (err, usuarioDb) => {
    Usuario.findOne({email: b.email, resetPassToken: b.resetPassToken, resetPassExpires: {$gte:b.expireToken} }, (err, usuarioDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error en el proceso de petición',
          errors: err
        })
      }

      if (!usuarioDb) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Credenciales incorrectas -EMAIL',
          errors: err
        })
      }

      // Si ok, cambiar pass y borrar: tokenTemp y expireToken
      let token = jwt.sign({usuario: usuarioDb}, SEED, {expiresIn: 14400});
      usuarioDb.password = bcrypt.hashSync(b.password, 10);
      usuarioDb.resetPassToken = null;
      usuarioDb.resetPassExpires = null;
      
      let usuario = new Usuario(usuarioDb)

      // guardar datos del usuario
      usuario.save((err) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error en el proceso de petición',
            errors: err
          })
        }

        // devolver: tokenTemp para crear resetLink
        res.status(200).json({
          ok: true,
          mensaje: 'Login resetPass',
          usuario: usuarioDb,
          token: token,
        });
      })

    })
 
    // How to Build a Node.js Authentication API using JWT, MongoDB, Express.js and Passport.js
    // https://medium.com/mesan-digital/tutorial-3a-how-to-build-a-node-js-a998838de6a2
    // https://medium.com/mesan-digital/tutorial-3b-how-to-add-password-reset-to-your-node-js-authentication-api-using-sendgrid-ada54c8c0d1f

    // https://www.it-swarm.dev/es/node.js/restablecer-contrasena-en-nodejs/831518787/

    // Node JS Password Reset Walkthrough - YelpCamp Tutorial
    // https://www.youtube.com/watch?v=UV9FvlTySGg
  },
  logout: (req, res, next) => {},
}

module.exports = loginC;
