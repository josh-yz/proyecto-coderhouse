const express = require('express');
const router = express.Router();

const carritoCompraController = require('../controllers/carritoCompraController');
const auth = require('../middlewares/auth');

router.get('/:id/productos',carritoCompraController.getCarritoProductosId); 
router.post('/',carritoCompraController.postCarrito); 
router.post('/:id/productos',carritoCompraController.postCarritoProducto); 
router.delete('/:id',carritoCompraController.deleteCarrito); 
router.delete('/:id/productos/:id_prod',carritoCompraController.deleteCarritoProducto); 


module.exports = router;