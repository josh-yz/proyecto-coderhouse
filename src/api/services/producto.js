const { productoModel } = require('../models');

module.exports = {
    async findAll() {
        const productos = await productoModel.find();
        return productos;
    },
    async findByPk(id) {
        try {
            const producto = await productoModel.findById(id);
            return producto
        } catch (error) {
            return null;
        } 
    },
    async create(producto) {
        const newProducto = new productoModel(producto);
        await newProducto.save();
        return newProducto
    },
    async update(id, producto) {
        const isExists = await module.exports.findByPk(id);
        if(isExists){
            const upProducto = await productoModel.findByIdAndUpdate(id,producto,{new : true});
            return upProducto
        }
        return  null
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if(isExists){
            const delProducto = await productoModel.findByIdAndDelete(id,{new : true});
            return delProducto
        }
        return  null
    },
};
