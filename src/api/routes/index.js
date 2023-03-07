const express = require('express');
const router = express.Router();

const routesProduct = require('./productoRouter');
const routesCarrito = require('./carritoCompraRouter');
const routesUsuario = require('./usuarioRouter');

router.use('/producto', routesProduct);
router.use('/carrito', routesCarrito);
router.use('/usuario', routesUsuario);

module.exports = router;
