const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
//const auth = require('../middlewares/auth');

router.get('/',productoController.getProducto); 
router.get('/:id',productoController.getProductoId); 
router.post('/',productoController.postProducto); 
router.put('/:id',productoController.putProducto); 
router.delete('/:id',productoController.deleteProducto); 

module.exports = router;