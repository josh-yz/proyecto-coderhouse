const { ordenService } = require('../services');
const ValidationError = require('../../core/errors/validationError');

module.exports = {
    async getOrden(req, res) {
        let productos = await ordenService.findAll();
        if (productos.length == 0) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: productos
            });
        }
    },
    async getOrdenId(req, res) {
        const { id } = req.params;
        let orden = await ordenService.findByPk(id);
        if (!orden) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: orden
            });
        }
    },
    async postOrden(req, res) {
        const { id } = req.params;
  
    
        try {
            if (req.session.passport && req.session.passport.user) {
                const usuario = req.session.passport.user;
                
                let newProducto = await ordenService.create(usuario._id, id)
                if (!newProducto) {
                    res.status(204).json();
                } else {
                    res.status(200).json({
                        data: newProducto
                    });
                }
            } else {
                res.status(202).json({
                    error: 'Tiene que iniciar sesion ',
                    data: {}
                });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(error.statusCode).json({ estado: false, error: error.message, data: {} });
            }
        }

    },
    async putOrden(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        let upProducto = await ordenService.update(id, { nombre, descripcion, codigo, foto, precio, stock })
        if (!upProducto) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: upProducto
            });
        }
    },
    async deleteOrden(req, res) {
        const { id } = req.params;
        let producto = await ordenService.delete(id)
        if (!producto) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: producto,
                msg: 'Registro eliminado'
            });
        }
    },
}