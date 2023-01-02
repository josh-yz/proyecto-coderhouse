const ProductoModel = require('../../models/mongodb/producto');

module.exports = {
    async findAll() {
        const productos = await ProductoModel.find();
        return productos;
    },
    async findByPk(id) {
        try {
            const producto = await ProductoModel.findById(id);
            return producto
        } catch (error) {
            return null;
        } 
    },
    async create(producto) {
        const newProducto = new ProductoModel(producto);
        await newProducto.save();
        return newProducto
    },
    async update(id, producto) {
        const isExists = await module.exports.findByPk(id);
        if(isExists){
            const upProducto = await ProductoModel.findByIdAndUpdate(id,producto,{new : true});
            return upProducto
        }
        return  null
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if(isExists){
            const delProducto = await ProductoModel.findByIdAndDelete(id,{new : true});
            return delProducto
        }
        return  null
    },
};
