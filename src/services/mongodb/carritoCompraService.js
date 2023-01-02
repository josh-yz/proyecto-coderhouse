const { CarritoCompra } = require('../../models/carritoCompra');
const { Producto } = require('../../models/producto');
const { Connection } = require('../../database');
const { v4: uuid } = require('uuid');

const FILEMANE = 'carrito_compra.json';
const db = new Connection(FILEMANE);

const productoService = require('./productoService');


const CarritoCompraModel = require('../../models/mongodb/carritoCompra');



module.exports = {
    async findAll() {
        const carritos = await CarritoCompraModel.find();
        return carritos;
    },
    async findByPk(id) {
        try {
            const carrito = await CarritoCompraModel.findById(id);
            return carrito
        } catch (error) {
            return null;
        }
    },

    async findByPkProductos(id) {
        try {
            const carrito = await CarritoCompraModel.findById(id);
            return carrito.productos;
        } catch (error) {
            return null;
        }
    },

    async create(producto) {
        const newProducto = new CarritoCompraModel(producto);
        await newProducto.save();
        return newProducto
    },
    async createProducto(id, idProd) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const producto = await productoService.findByPk(idProd);
            if (producto) {
                const { nombre, descripcion, codigo, foto, precio, } = producto;
                const productos = isExists.productos;
                const index = productos.findIndex(x => x.id == idProd);
                if (index >= 0) {
                    let cantidad = (productos[index].cantidad) + 1
                    productos[index].cantidad = cantidad;
                } else {
                    productos.push({ id: idProd, nombre, descripcion, codigo, foto, precio, cantidad: 1 });
                }
                const upProducto = await CarritoCompraModel.findByIdAndUpdate(id, { productos }, { new: true })
                return upProducto;
            }
            return null;
        }
        return null;
    },

    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const delCarritoCompra = await CarritoCompraModel.findByIdAndDelete(id, { new: true });
            return delCarritoCompra
        }
        return null
    },
    async deleteProducto(id, idProd) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const producto = await productoService.findByPk(idProd);
            if (producto) {
                const productos = isExists.productos;
                const indexProv = productos.findIndex(x => x.id == idProd);
                if (indexProv < 0) return null;
                productos.splice(indexProv, 1);
                const upProducto = await CarritoCompraModel.findByIdAndUpdate(id, { productos }, { new: true })
                return upProducto;
            }
            return null;
        }
        return null;


    },
};