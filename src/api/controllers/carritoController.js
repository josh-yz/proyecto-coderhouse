const {carritoService} = require('../services');


module.exports = {
    async postCarrito(req, res) {
        let newCarrito = await carritoService.create([])
        if (!newCarrito) {
            res.status(204).json();
        } else {
            res.status(200).json({ 
                data: newCarrito
             });
        }
    },
    async deleteCarrito(req, res) {
        const { id } = req.params;
        let carrito = await carritoService.delete(id)
        if (!carrito) {
            res.status(202).json({ msg: 'No existe la id' });
        } else {
            res.status(200).json({ 
                data: carrito, 
                msg: 'Registro eliminado' 
            });
        }
    },
    async getCarritoProductosId(req, res) {
        const { id } = req.params;
        let productos = await carritoService.findByPkProductos(id);
        if (!productos) {
            res.status(204).json();
        } else {
            res.status(200).json({ 
                data: productos 
            });
        }
    },
    async postCarritoProducto(req, res) {
        const { id } = req.params;
        const { id_prov } = req.body;
        let newCarritoProducto = await carritoService.createProducto(id,id_prov)
        if (!newCarritoProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({ 
                data: newCarritoProducto 
            });
        }
    },
    async deleteCarritoProducto(req, res) {
        const { id, id_prod } = req.params;
        let carrito = await carritoService.deleteProducto(id, id_prod)
        if (!carrito) {
            res.status(202).json({ msg: 'No existe la id' });
        } else {
            res.status(200).json({ 
                msg: 'Registro eliminado' 
            });
        }
    },

}