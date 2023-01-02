const { CarritoCompra } = require('../../models/firebase/carritoCompra');
const db = require('../../database/firebase/firebase-connect');
const COLLECTION = 'CarritoCompra';

const productoService = require('./productoService');






module.exports = {
    async findAll() {
        let res = await db.collection(COLLECTION).get();
        const carritos = res.docs.map(x => {
            return new CarritoCompra({...x.data(),id: x.id})
        });
        return carritos;
    },
    async findByPk(id) {
        try {
            const doc = await db.collection(COLLECTION).doc(id).get();
            if(doc.data()){
                return new CarritoCompra({
                    ...doc.data(),
                    id: doc.id
                });
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    async findByPkProductos(id) {
        try {
            const isExists = await module.exports.findByPk(id);
            if(isExists){
                return isExists.productos;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    async create(producto) {
        const data= { productos :producto,timestamp: new Date() };
        let newCarrito = await db.collection(COLLECTION).add(data);
        return new CarritoCompra({...data,id: newCarrito.id});
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
                await db.collection(COLLECTION).doc(id).update({...isExists,productos});
                return new CarritoCompra(isExists);
            }
            return null;
        }
        return null;
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if(isExists){
            await db.collection(COLLECTION).doc(id).delete();
            return new Producto(isExists);
        }
        return null
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if(isExists){
            await db.collection(COLLECTION).doc(id).delete();
            return new CarritoCompra(isExists);
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
                await db.collection(COLLECTION).doc(id).update({...isExists,productos});
                return new CarritoCompra(isExists);
            }
            return null;
        }
        return null;


    },
};