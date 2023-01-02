const { Producto } = require('../../models/firebase/producto');
const db = require('../../database/firebase/firebase-connect');
const COLLECTION = 'Producto';

module.exports = {
    async findAll() {
        let res = await db.collection(COLLECTION).get();
        const productos = res.docs.map(x => {
            return new Producto({...x.data(),id: x.id})
        });
        return productos;
    },
    async findByPk(id) {
        try {
            const doc = await db.collection(COLLECTION).doc(id).get();
            if(doc.data()){
                return new Producto({
                    ...doc.data(),
                    id: doc.id
                });
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    async create(producto) {
        const data= { ...producto,timestamp: new Date() };
        let newProducto = await db.collection(COLLECTION).add(data);
        return new Producto({...data,id: newProducto.id});
    },
    async update(id, producto) {
        const isExists = await module.exports.findByPk(id);
        if(isExists){
            await db.collection(COLLECTION).doc(id).update(producto);
            return new Producto(isExists);
        }
        return null
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if(isExists){
            await db.collection(COLLECTION).doc(id).delete();
            return new Producto(isExists);
        }
        return null
    },
};
