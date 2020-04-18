const Usuario = require('../models/usuarioModel');
const Medico = require('../models/medicoModel');
const Hospital = require('../models/hospitalModel');

const fs = require('fs');

const uploadC = {
  uploadProva : async(req, res, next) => {
    
    res.status(200).json({
      ok: true,
      mensaje: 'Peticion UPLOAD realizada correctamente'
   });
  },
  uploadImg : async(req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    let tipo = req.params.tipo;
    let id = req.params.id;    
    let imgUploaded = req.files.imagen;
    let imgName = imgUploaded.name;
    // partir img en un array, en partes separadas por "."
    let imgParts = imgName.split('.');
    // obtener extension
    let imgExtension = imgParts[imgParts.length -1];
    // definir img validas
    let imgValidas = ['jpg', 'jepg', 'gif', 'png'];
    // comprobar extensión
    if (!imgValidas.includes(imgExtension)) {
      return res.status(400).send('Extension img no valida.');      
    }
    // construir nombre img
    let imgNewName = `${id}-${ new Date().getMilliseconds() }`;
    // construir ruta img
    let path = `./uploads/${tipo}/${imgNewName}.${imgExtension}`;
    // mover img al directorio correspondiente
    imgUploaded.mv(path, (err) => {
      if (err) {
        return res.status(500).send({
          mensaje: 'Error al mover el archivo',
          err
        });        
      }
      imgNewName = imgNewName+'.'+imgExtension;
      subirPorTipo(tipo, id, imgNewName, res);
    })
    
  }
}

function subirPorTipo(tipo, id, nombreArchivo, res) {
  if (tipo === 'usuarios') {
    Usuario.findById(id, (err, usuarioDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar usuario',
          err
        })
      }
      
      if (usuarioDb.img != '') {
        let nombreArchivoAntiguo = usuarioDb.img;
        let path = `./uploads/${tipo}/${nombreArchivoAntiguo}`
        console.log(path);
        if (fs.existsSync(path)) {
          fs.unlinkSync(path );
        }       
      }
      
      usuarioDb.img = nombreArchivo;
      usuarioDb.password = ':)';

      usuarioDb.save((err, usuarioDbActualizado) => {
        res.status(200).json({
          ok: true,
          mensaje: 'Imagen de usuario actualizada correctamente',
          usuario: usuarioDbActualizado
        });
        
      })
    })
  }

  if (tipo === 'hospitales') {
    Hospital.findById(id, (err, hospitalDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar Hospital',
          err
        });
      }
      
      if (hospitalDb.img != "") {
        let nombreArchivoAntiguo = hospitalDb.img;
        let path = `./uploads/${tipo}/${nombreArchivoAntiguo}`
        console.log(path);
        if (fs.existsSync(path)) {
          fs.unlinkSync(path );
        }
      }
      
      hospitalDb.img = nombreArchivo;
      hospitalDb.save((err, hospitalDbActualizado) => {
        res.status(200).json({
          ok: true,
          mensaje: 'Imagen de hospital actualizada correctamente',
          hospital: hospitalDbActualizado
        });
        
      })
    })

  }

  if (tipo === 'medicos') {
    Medico.findById(id, (err, medicoDb) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar medico',
          err
        });
      }
      
      if (medicoDb.img != '') {
        let nombreArchivoAntiguo = medicoDb.img;
        let path = `./uploads/${tipo}/${nombreArchivoAntiguo}`
        console.log(path);
        if (fs.existsSync(path)) {
          fs.unlinkSync(path );
        }        
      }
      
      medicoDb.img = nombreArchivo;
      medicoDb.save((err, medicoDbActualizado) => {
        res.status(200).json({
          ok: true,
          mensaje: 'Imagen de medico actualizada correctamente',
          medico: medicoDbActualizado
        });
        
      })
    })

  }

}

module.exports = uploadC;