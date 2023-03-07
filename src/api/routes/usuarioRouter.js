const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const upload = require('../../core/middlewares/multer.config');


router.get('/',usuarioController.getUsuario); 
router.get('/:id',usuarioController.getUsuarioId); 
router.post('/',upload.single('photo'),usuarioController.postUsuario); 
router.put('/:id',usuarioController.putUsuario); 
router.delete('/:id',usuarioController.deleteUsuario); 

module.exports = router;