const productoMongo = require('../services/mongodb/productoService');
const productoFirebase = require('../services/firebase/productoService');

const productoService = (db) => db == 'mongodb' ? productoMongo : productoFirebase


module.exports = {
    async getProducto(req, res) {
        const db = req.headers.database;
        let productos = await productoService(db).findAll();
        if (productos.length == 0) {
            res.status(204).json();
        } else {
            res.status(200).json({
                db,
                data: productos
            });
        }
    },
    async getProductoId(req, res) {
        const { id } = req.params;
        const db = req.headers.database;
        let productos = await productoService(db).findByPk(id);
        if (!productos) {
            res.status(204).json();
        } else {
            res.status(200).json({
                db,
                data: productos 
            });
        }
    },
    async postProducto(req, res) {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const db = req.headers.database;
        let newProducto = await productoService(db).create({ nombre, descripcion, codigo, foto, precio, stock })
        if (!newProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({ 
                db,
                data: newProducto 
            });
        }
    },
    async putProducto(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const db = req.headers.database;
        let upProducto = await productoService(db).update(id, { nombre, descripcion, codigo, foto, precio, stock })
        if (!upProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({  
                db,
                data: upProducto
             });
        }
    },
    async deleteProducto(req, res) {
        const { id } = req.params;
        const db = req.headers.database;
        let producto = await productoService(db).delete(id)
        if (!producto) {
            res.status(204).json();
        } else {
            res.status(200).json({ 
                db,
                data: producto, 
                msg: 'Registro eliminado'
             });
        }
    },
}