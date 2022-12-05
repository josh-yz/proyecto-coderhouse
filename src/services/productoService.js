const { Producto } = require('./../models/producto');
const { Connection } = require('./../database');
const { v4: uuid } = require('uuid');

const FILEMANE = 'producto.json';
const db = new Connection(FILEMANE);


module.exports = {
    async findAll() {
        const data = await db.getAll();
        const producto = data.map(x => {
            return new Producto(x);
        });
        return producto;
    },
    async findByPk(id) {
        const data = await db.getAll();
        const producto = data.find(x => x.id == id);
        return producto ? new Producto(producto) : null;
    },
    async create(producto) {
        const newProducto = await db.save({ ...producto, id: uuid(), timestamp: new Date() });
        return new Producto(newProducto);
    },
    async update(id, producto) {
        const arr = await db.getAll();
        const index = arr.findIndex(x => x.id == id);
        if (index < 0) return null;
        const upProducto = arr[index];
        const { timestamp } = upProducto;
        arr[index] = {...producto,timestamp,id}
        await db.update(arr);
        return  arr[index]
    },
    async delete(id) {
        const data = await db.getAll();
        const index = data.findIndex(x => x.id == id);
        if (index < 0)  return null;
        data.splice(index, 1); 
        await db.update(data);
        return data[index];
    },
};
