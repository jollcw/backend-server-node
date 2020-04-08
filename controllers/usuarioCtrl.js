const Usuario = require('../models/usuarioModel');
const mongoose = require('mongoose');
// var ObjectID = require('mongo').ObjectID;
// para encriptar la contraseña
const bcrypt = require('bcryptjs'); 

const usuarioC = {
  userFindAll: async (req, res, next) => {
    Usuario.find({}, 'nombre email img role')
      .exec(
        (err, usuarios) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              mensaje: 'Error cargando usuarios',
              errors: err
            });
          }
          res.status(200).json({
            ok: true,
            usuarios: usuarios
          });

        });
  },
  userInsert: async (req, res, next) => {
    // recoger los parametos del objeto: request.body, creado por: body-parser
    let body = req.body;

    // crear un usuario del tipo Usuario -> mongoose.Schema
    let usuario = new Usuario({
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      img: body.img,
      role: body.role
    });

    usuario.save((err, usuarioGuardado) => {

      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al crear usuario',
          errors: err
        });
      }

      res.status(201).json({
        ok: true,
        usuario: usuarioGuardado
      });
    });
  },
  userUpdate: async (req, res, next) => {
    let id = req.params.id;
    let b = req.body;
    // console.log(id);

    Usuario.findById(id, (err, usuarioBd) => {

      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar usuario',
          errors: err
        });
      }

      if (!usuarioBd) {
        return res.status(400).json({
          ok: false,
          mensaje: `El usuario con el ${id} no existe`,
          errors: {message: `El usuario con el ${id} no existe`}
        });
      }

      usuarioBd.nombre = b.nombre;
      usuarioBd.email = b.email;
      usuarioBd.role = b.role;

      usuarioBd.save((err, usuarioGuardado) => {

        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar usuario',
            errors: err
          })
        }

        res.status(200).json({
          ok: true,
          usuario: usuarioGuardado
        })

      });

    });
  },
  userDelete: async (req, res, next) => { 
    let id = req.params.id;

    Usuario.findByIdAndRemove(id,(err, usuarioBorrado) => {

      if (err) {
        return res.status(500).json({
          ok:false,
          mensaje: 'Error al eliminar usuario',
          errors: err
        })
      }

      if (!usuarioBorrado) {
        return res.status(400).json({
          ok:false,
          mensaje: 'No existe usuario con este id',
          errors: err
        })
      }

      res.status(200).json({
        ok: true,
        usuario: usuarioBorrado
      })
    })
  }
};

module.exports = usuarioC;