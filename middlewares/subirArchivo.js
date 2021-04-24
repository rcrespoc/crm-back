const shortid = require('shortid');
const multer = require('multer');

const configuracionMulter = {
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname+'../../uploads/')
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req, file, cb){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null, true)
    }else{
      cb(new Error('Formato no válido'));
    }
  }
}

const upload = multer(configuracionMulter).single('imagen')

const subirArchivo = async(req, res, next) => {
  upload(req, res, function(error){
    if(error){
      res.json({
        msg: error
      })
    }
    if(req.file?.filename){
      req.body.imagen = req.file.filename;
    }
    return next();
  })
}

module.exports = {
  subirArchivo
}