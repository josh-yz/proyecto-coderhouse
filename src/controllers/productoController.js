//const productoService = require('../services/mongodb/productoService');
const productoService = require('../services/firebase/productoService');


module.exports = {
    async getProducto(req, res) {
        //let productos = await productoService.findAll();
        let productos = await productoService.findAll();
        if (productos.length == 0) {
            res.status(204).json();
        } else {
            res.status(200).json({ 
                bd : req.headers.database, 
                data: productos 
            });
        }
    },
    async getProductoId(req, res) {
        const { id } = req.params;
        let productos = await productoService.findByPk(id);
        if (!productos) {
            res.status(204).json();
        } else {
            res.status(200).json({ data: productos });
        }
    },
    async postProducto(req, res) {
        const { nombre,descripcion,codigo,foto,precio,stock } = req.body;
        let newProducto = await productoService.create({nombre,descripcion,codigo,foto,precio,stock})
        if (!newProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({ data: newProducto });
        }
    },
    async putProducto(req, res) {
        const { id } = req.params;
        const { nombre,descripcion,codigo,foto,precio,stock } = req.body;
        let upProducto = await productoService.update(id,{nombre,descripcion,codigo,foto,precio,stock})
        if (!upProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({ data: upProducto });
        }
    },
    async deleteProducto(req, res) {
        const { id } = req.params;
        let producto = await productoService.delete(id)
        if (!producto) {
            res.status(204).json();
        } else {
            res.status(200).json({ data: producto, msg: 'Registro eliminado' });
        }
    },
}