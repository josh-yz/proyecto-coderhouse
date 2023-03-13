const productoService = require('./producto');
const { carritoModel } = require('../models');

module.exports = {
    async findAll() {
        const carritos = await carritoModel.find();
        return carritos;
    },
    async findByPk(id) {
        try {
            const carrito = await carritoModel.findById(id);
            return carrito
        } catch (error) {
            return null;
        }
    },

    async findByPkProductos(id) {
        try {
            const carrito = await carritoModel.findById(id);
            return carrito.productos;
        } catch (error) {
            return null;
        }
    },

    async create(producto) {
        const newProducto = new carritoModel(producto);
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
                const upProducto = await carritoModel.findByIdAndUpdate(id, { productos }, { new: true })
                return upProducto;
            }
            return null;
        }
        return null;
    },

    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const delCarritoCompra = await carritoModel.findByIdAndDelete(id, { new: true });
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
                const upProducto = await carritoModel.findByIdAndUpdate(id, { productos }, { new: true })
                return upProducto;
            }
            return null;
        }
        return null;


    },
};