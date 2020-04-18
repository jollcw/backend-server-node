// const {ErrorHandler} = require('../helpers/error');
const { handleError, ErrorHandler } = require("../helpers/error");
// Importar el Modelo
const Usuario = require('../models/usuarioModel');
const Medico = require('../models/medicoModel');
const Hospital = require('../models/hospitalModel');

const busquedaC = {
  busquedaDefault: (req, res, next) => {
    res.status(200).json({
      ok: true,
      mensaje: 'Peticion realizada correctamente'
   });
  },
  busquedaColeccion: async(req, res, next) => {
    try {
      let tabla = req.params.tabla;
      let busqueda = req.params.busqueda;
      let regex = new RegExp(busqueda, 'i');
      // throw new ErrorHandler(400, 'no busqueda');

      let resultado = [];
      // if (tabla === 'medicos') {
      //   resultado = await buscarMedicos(regex);        
      // } else if(tabla === 'hospitales') {
      //   resultado = await buscarHospitales(regex);
      // } else if(tabla === 'usuarios') {
      //   resultado = await buscarUsuarios(regex);        
      // }

      switch (tabla) {
        case 'medicos':
          resultado = await buscarMedicos(regex);
          break;
      
        case 'hospitales':
          resultado = await buscarHospitales(regex);
          break;
      
        case 'usuarios':
          resultado = await buscarUsuarios(regex);
          break;
      
        default:
          return res.status(400).json({
            ok: false,
            mensaje: 'La búscqueda solo son: usuarios, medicos, hospitales',
            error: {message: 'Tabla o colección no válido'}
          })
          break;
      }

      res.status(200).json({
        ok: true,
        [tabla]: resultado
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        mensaje: error
      })
    }

  },

  busquedaTodo: async( req, res, next) => {
    try {
      let busqueda = req.params.busqueda;
      let regex = new RegExp(busqueda, 'i');
      // throw new ErrorHandler(400, 'no busqueda');

      let h = await buscarHospitales(regex);
      let m = await buscarMedicos(regex);
      let u = await buscarUsuarios(regex);

      // let hm = await [buscarHospitales(regex), buscarMedicos(regex)];

      // if (!hm) {
      //   throw new ErrorHandler(400, `hospital '${busqueda}' not found`);
      // }else{
      //   console.log(hm.statusCode);
      //   // if (hm.statusCode > 200) {
      //   //   // throw new ErrorHandler(h.statusCode, h.error);
      //   //   // throw new ErrorHandler(400, `hospital '${busqueda}' not found`);
      //   //   throw new ErrorHandler(h.statusCode, h);
      //   // }
        res.status(200).json({
          ok: true,
          medicos: m,
          hospitales: h,
          usuarios: u
        })      
      // }
    } 
    catch (err) {
      // res.status(err.statusCode).json({
      res.status(500).json({
        ok: false,
        err: err.message
      })      
    }
  }
};

async function buscarHospitales(regex) {
  try {
    let hospitales = await Hospital.find({nombre: regex})
      .populate('usuario', 'nombre email')
      .exec();

    console.log('hospitales.length()', hospitales.length);

    if (hospitales.length <= 0) {
      console.log('no hospitales');
      // throw new ErrorHandler(404, 'no hospitales')
    } else {
      return hospitales;
    }
  } catch (error) {
    return error;
  }
}

async function buscarMedicos(regex) {
  try {
    let medicos = await Medico.find({nombre: regex})
      .populate('usuario', 'nombre email')
      .populate('hospital', 'nombre')
      .exec();

    console.log('medicos.length()', medicos.length);
    if (medicos.length <= 0) {
      console.log('no medicos');
      // throw new ErrorHandler(404, 'no medicos')
    } else {
      return medicos;
    }
  } catch (error) {
    return error;
  }
}

async function buscarUsuarios(regex) {
  try {
    let usuarios = await Usuario.find({}, 'nombre email role')
      .or([{nombre: regex}, {email: regex}])
      .exec();

      console.log('usuarios.length()', usuarios.length);
    if (usuarios.length <= 0) {
      console.log('no usuarios');
      // throw new ErrorHandler(404, 'no usuarios')
    } else {
      return usuarios;
    }
  } catch (error) {
    return error;
  }
}

module.exports = busquedaC;
