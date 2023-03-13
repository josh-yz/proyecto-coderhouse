const express = require('express');
const router = express.Router();
const upload = require('../../core/middlewares/multer.config');
const auth = require('../../core/middlewares/auth');
const {
  getUsuario,
  postUsuario,
  getUsuarioId,
  putUsuario,
  deleteUsuario
} = require('../controllers/usuarioController');


router.get('/',auth,getUsuario); 
router.get('/:id',getUsuarioId); 
router.post('/',upload.single('photo'),postUsuario); 
router.put('/:id',putUsuario); 
router.delete('/:id',deleteUsuario); 

module.exports = router;