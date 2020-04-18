const Medico = require('../models/medicoModel');

const medicoC = {
  medicoGet: (req, res, next) => {
    Medico.find((err, medicos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar médicos',
          errors: err
        })
      }

      if (!medicos) {
        return res.status(401).json({
          ok: false,
          mensaje: 'No se han encontrado médicos'
        })
      }

      res.status(200).json({
        ok: true,
        medicos: medicos
      })
    })
  },
  medicoGetDetails: (req, res, next) => {
    Medico.find({})
    .populate('hospital')
    .populate('usuario', 'nombre email')
    .exec((err, medicos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar médicos',
          errors: err
        })
      }

      if (!medicos) {
        return res.status(401).json({
          ok: false,
          mensaje: 'No se han encontrado médicos'
        })
      }

      res.status(200).json({
        ok: true,
        medicos: medicos
      })
    })
  },
  medicoInsert: (req, res, next) => {
    let b = req.body;

    let medico = new Medico({
      nombre: b.nombre,
      img: b.img,
      usuario: b.usuario,
      hospital: b.hospital
    });

    medico.save((err, medicoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar médicos',
          errors: err
        })
      }

      if (!medicoGuardado) {
        return res.status(401).json({
          ok: false,
          mensaje: 'No se han guardado médico'
        })
      }

      res.status(200).json({
        ok: true,
        medico: medicoGuardado
      })

    })
  },

  medicoEdit: (req, res, next) => {
    let id = req.params.id;
    let b = req.body;
    
    Medico.findById(id, (err, medicoDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar usuario para ediar',
          errors: err
        })
      }

      if (!medicoDb) {
        return res.status(401).json({
          ok: false,
          mensaje: 'No se ha encontrado médico'
        })
      }

      medicoDb.nombre = b.nombre;
      medicoDb.usuario = b.usuario;
      medicoDb.hospital = b.hospital;

      medicoDb.save((err, medicoGuardado) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error al guardar médico',
            errors: err
          })
        }
  
        if (!medicoGuardado) {
          return res.status(401).json({
            ok: false,
            mensaje: 'No se han guardado médico'
          })
        }
  
        res.status(200).json({
          ok: true,
          medico: medicoGuardado
        })
  
      })

    })
  },
  medicoDelete: (req, res, next) => {
    let id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al eliminar médico',
          errors: err
        })
      }

      if (!medicoDb) {
        return res.status(401).json({
          ok: false,
          mensaje: 'No se ha eliminado médico'
        })
      }

      res.status(200).json({
        ok: true,
        medico: medicoDb
      })

    })
  },
}

module.exports = medicoC;