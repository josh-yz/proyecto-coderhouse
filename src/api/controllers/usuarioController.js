const { usuarioService } = require('../services');

const ValidationError = require('../../core/errors/validationError');
module.exports = {
    async getUsuario(req, res) {
        let usuarios = await usuarioService.findAll();
        if (usuarios.length == 0) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: usuarios
            });
        }
    },
    async getUsuarioId(req, res) {
        const { id } = req.params;
        let usuario = await usuarioService.findByPk(id);
        if (!usuario) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: usuario
            });
        }
    },
    async postUsuario(req, res) {
        try {
            const { name, email, password, address, age, phoneNumber } = req.body;
            if(!req.file){
               return res.status(202).json({
                    estado: false,
                    msg: 'Falta ingresar la imagen el usuario',
                    data: {}
                });
            }
            let newUsuario = await usuarioService.create({ name, email, password, address, age, phoneNumber , photo : `/${req.file.filename}`})
            if (!newUsuario) {
                res.status(204).json();
            } else {
                res.status(200).json({
                    data: newUsuario
                });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(error.statusCode).json({ estado: false, error: error.message, data: {}  });
            }
        }
    },
    async putUsuario(req, res) {
        const { id } = req.params;
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        let upUsuario = await usuarioService.update(id, { nombre, descripcion, codigo, foto, precio, stock })
        if (!upUsuario) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: upUsuario
            });
        }
    },
    async deleteUsuario(req, res) {
        const { id } = req.params;
        let usuario = await usuarioService.delete(id)
        if (!usuario) {
            res.status(204).json();
        } else {
            res.status(200).json({
                data: usuario,
                msg: 'Registro eliminado'
            });
        }
    },
}