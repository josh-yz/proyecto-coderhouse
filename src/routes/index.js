const express = require('express');
const router = express.Router();

const routesProduct = require('./productoRouter');
const routesCarrito = require('./carritoCompraRouter');

router.use('/producto', routesProduct);
router.use('/carrito', routesCarrito);

module.exports = router;
