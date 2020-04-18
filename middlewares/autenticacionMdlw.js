const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

const autenticacionM = {
  verificaToken: (req, res, next) => {
    
    let token = '';    
    const authorization = req.headers['authorization'];

    if (authorization) {
      // console.log(authorization);
      // token = authorization ? authorization.replace('Bearer ', '') : null;
      token = req.headers.authorization.split(" ")[1];      
    } else {
      token = req.query.token;
    }

    if (!token) {
      return res.status(403).send({
        auth: false,
        message: 'No se ha enviado token.'
      });
    }

    jwt.verify(token, SEED, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Token incorrecto',
          errors: err
        });
      }

      req.usuario = decoded.usuario;

      next();

    })
  }
}

module.exports = autenticacionM;