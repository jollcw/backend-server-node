// Importar modelo
const Hospital = require('../models/hospitalModel');

const hospitalC = {
  hospitalGet: (req, res, next) => {
    let b = req.body;
    Hospital.find( (err, hospitalDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar hospitales',
          errors: err
        })
      }

      if (!hospitalDb) {
        return res.status(400).json({
          ok: false
        })
      }

      res.status(200).json({
        ok: true,
        hospital: hospitalDb
      })
    })
  },
  hospitalGetDetails: (req, res, next) => {
    let b = req.body;
    console.log('details hospital');
    Hospital.find({})
    .populate('usuario', 'nombre email')
    .exec((err, hospitalDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar hospitales',
          errors: err
        })
      }

      if (!hospitalDb) {
        return res.status(400).json({
          ok: false
        })
      }

      res.status(200).json({
        ok: true,
        hospital: hospitalDb
      })
    })
  },
  hospitalInsert: (req, res, next) => {
    let b = req.body;

    let hospital = new Hospital({
      nombre: b.nombre,
      img: b.img,
      usuario: b.usuario
    })

    hospital.save(((err, hospitalDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar hospitales',
          errors: err
        })
      }

      if (!hospitalDb) {
        return res.status(400).json({
          ok: false
        })
      }

      res.status(200).json({
        ok: true,
        hospital: hospitalDb
      })      
    })) 
  },
  hospitalUpdate: (req, res, next) => {
    let id = req.params.id;
    let b = req.body;
    Hospital.findById(id, (err, hospitalDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al editar hospital',
          errors: err
        })
      }

      if (!hospitalDb) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Hospital no encontrado',
          errors: err
        })
      }

      hospitalDb.nombre = b.nombre;
      hospitalDb.img = b.img;

      hospitalDb.save((err, hospitalGuardado) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: 'Error al editar hospital',
            errors: err
          })
        }

        res.status(201).json({
          ok: true,
          mensaje: 'Hospital editado',
          hospital: hospitalGuardado
        })

      })
    })
  },
  hospitalDelte: (req, res, next) => {
    let id = req.params.id;
    Hospital.findByIdAndRemove(id, (err, hospitalDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al eliminar hospital',
          errors: err
        })
      }

      if (!hospitalDb) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Hospital no encontrado',
          errors: err
        })
      }

      res.status(201).json({
        ok: true,
        mensaje: 'Hospital eliminado',
        hospital: hospitalDb
      })

    })

  }
}

module.exports = hospitalC;