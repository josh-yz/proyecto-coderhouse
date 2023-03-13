const express = require('express');
const router = express.Router();

const {
    getCarritoProductosId,
    postCarrito,
    postCarritoProducto,
    deleteCarrito,
    deleteCarritoProducto
} = require('../controllers/carritoController');
//const auth = require('../middlewares/auth');

router.get('/:id/productos',getCarritoProductosId); 
router.post('/',postCarrito); 
router.post('/:id/productos',postCarritoProducto); 
router.delete('/:id',deleteCarrito); 
router.delete('/:id/productos/:id_prod',deleteCarritoProducto); 


module.exports = router;