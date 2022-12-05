const { CarritoCompra } = require('./../models/carritoCompra');
const { Producto } = require('./../models/producto');
const { Connection } = require('./../database');
const { v4: uuid } = require('uuid');

const FILEMANE = 'carrito_compra.json';
const db = new Connection(FILEMANE);


module.exports = {
    async findAll() {
        const data = await db.getAll();
        const producto = data.map(x => {
            return new CarritoCompra(x);
        });
        return producto;
    },
    async findByPk(id) {
        const data = await db.getAll();
        const producto = data.find(x => x.id == id);
        return producto ? new CarritoCompra(producto) : null;
    },

    async findByPkProductos(id) {
        const data = await db.getAll();
        const carrito = data.find(x => x.id == id);
        if(carrito.productos.length == 0) return null;
        const productos = carrito.productos.map(x => (new Producto(x)));
        return productos;
    },

    async create(productos) {
        const newProducto = await db.save({ productos, id: uuid(), timestamp: new Date() });
        return new CarritoCompra(newProducto);
    },
    async createProducto(id,producto) {
        const data = await db.getAll();
        const index = data.findIndex(x => x.id == id);
        if (index < 0) return null;
        const upProductos = data[index].productos;
        upProductos.push({ ...producto, id: uuid(), timestamp: new Date() });
        data[index].productos = upProductos;
        await db.update(data);
        return  data[index]
    },
    // async update(id, producto) {
    //     const arr = await db.getAll();
    //     const index = arr.findIndex(x => x.id == id);
    //     if (index < 0) return null;
    //     const upProducto = arr[index];
    //     const { timestamp } = upProducto;
    //     arr[index] = {...producto,timestamp,id}
    //     await db.update(arr);
    //     return  arr[index]
    // },
    async delete(id) {
        const data = await db.getAll();
        const index = data.findIndex(x => x.id == id);
        if (index < 0)  return null;
        const carrito = {...data[index]};
        data.splice(index, 1); 
        await db.update(data);
        return carrito;
    },
    async deleteProducto(id,idProd) {
        const data = await db.getAll();
        const index = data.findIndex(x => x.id == id);
        if (index < 0)  return null;
        const productos = data[index].productos;
        const indexProv = productos.findIndex(x => x.id == idProd);
        if (indexProv < 0)  return null;
        productos.splice(indexProv, 1); 
        data[index].productos = productos;
        await db.update(data);
        return  data[index]
  
    },
};