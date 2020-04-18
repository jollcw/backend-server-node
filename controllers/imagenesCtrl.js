const path = require('path');
const fs = require('fs');

const imgC = {
  imgPath: (req, res, next) => {

    let tipo = req.params.tipo;
    let img = req.params.img;
    
    let imgPath = path.resolve(__dirname, `../uploads/${ tipo }/${ img }`);

    if (fs.existsSync(imgPath)) {
      res.sendFile(imgPath);
    } else {
      let noImgPath = path.resolve(__dirname, `../assets/no-img.jpg`);
      res.sendFile(noImgPath);
    }
  }
};

module.exports = imgC;