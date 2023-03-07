const { usuarioModel } = require('../models');
const ValidationError = require('../../core/errors/validationError');
const { sendMail } = require('../../core/email/emailter');

const notificarNuevoUsuario = async (usuario) => {
    try {
        const filteredKeys = ['_id', 'password'];
        const formattedText = Object.keys(usuario._doc)
            .filter(key => !filteredKeys.includes(key))
            .map(key => `${key.toUpperCase()} = ${usuario._doc[key]}`)
            .join('\n');

        const email = process.env.GLOBAL_MAIL;
        const sw = await sendMail({
            email,
            asunto: 'NUEVO REGISTRO',
            texto: formattedText
        });
        return sw
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    async findAll() {
        const usuarios = await usuarioModel.find();
        return usuarios;
    },
    async findByPk(id) {
        try {
            const usuario = await usuarioModel.findById(id);
            return usuario
        } catch (error) {
            return null;
        }
    },
    async create(usuario) {
        try {
            const newUsuario = new usuarioModel(usuario);
            await newUsuario.validateEmailNotTaken();
            newUsuario.password = newUsuario.encryptPassword(usuario.password)
            await newUsuario.save();
            await notificarNuevoUsuario(newUsuario);
            return newUsuario
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new ValidationError(error.message);
            } else {
                throw new ValidationError(error);
            }
        }
    },
    async update(id, usuario) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const upUsuario = await usuarioModel.findByIdAndUpdate(id, usuario, { new: true });
            return upUsuario
        }
        return null
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const delUsuario = await usuarioModel.findByIdAndDelete(id, { new: true });
            return delUsuario
        }
        return null
    },
};
