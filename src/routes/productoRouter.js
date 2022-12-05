const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const auth = require('../middlewares/auth');

router.get('/',productoController.getProducto); 
router.get('/:id',productoController.getProductoId); 
router.post('/',auth,productoController.postProducto); 
router.put('/:id',auth,productoController.putProducto); 
router.delete('/:id',auth,productoController.deleteProducto); 

module.exports = router;