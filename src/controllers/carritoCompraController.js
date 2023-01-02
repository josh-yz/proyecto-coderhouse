const carritoCompraMongo = require('../services/mongodb/carritoCompraService');
const carritoCompraFirebase = require('../services/firebase/carritoCompraService');

const carritoCompraService = (db) => db == 'mongodb' ? carritoCompraMongo : carritoCompraFirebase

module.exports = {
    async postCarrito(req, res) {
        const db = req.headers.database;
        let newCarrito = await carritoCompraService(db).create([])
        if (!newCarrito) {
            res.status(204).json();
        } else {
            res.status(200).json({ 
                db,
                data: newCarrito
             });
        }
    },
    async deleteCarrito(req, res) {
        const { id } = req.params;
        const db = req.headers.database;
        let carrito = await carritoCompraService(db).delete(id)
        if (!carrito) {
            res.status(202).json({ msg: 'No existe la id' });
        } else {
            res.status(200).json({ 
                db,
                data: carrito, 
                msg: 'Registro eliminado' 
            });
        }
    },
    async getCarritoProductosId(req, res) {
        const { id } = req.params;
        const db = req.headers.database;
        let productos = await carritoCompraService(db).findByPkProductos(id);
        if (!productos) {
            res.status(204).json();
        } else {
            res.status(200).json({ 
                db,
                data: productos 
            });
        }
    },
    async postCarritoProducto(req, res) {
        const { id } = req.params;
        const { id_prov } = req.body;
        const db = req.headers.database;
        let newCarritoProducto = await carritoCompraService(db).createProducto(id,id_prov)
        if (!newCarritoProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({ 
                db,
                data: newCarritoProducto 
            });
        }
    },
    async deleteCarritoProducto(req, res) {
        const { id, id_prod } = req.params;
        const db = req.headers.database;
        let carrito = await carritoCompraService(db).deleteProducto(id, id_prod)
        if (!carrito) {
            res.status(202).json({ msg: 'No existe la id' });
        } else {
            res.status(200).json({ 
                db,
                msg: 'Registro eliminado' 
            });

        }
    },



}