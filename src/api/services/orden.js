const { ordenModel } = require('../models');
const carritoService = require('./carrito');
const usuarioService = require('./usuario');
const ValidationError = require('../../core/errors/validationError');
const { sendMail } = require('../../core/email/emailter');
const { sendWhatsApp,sendSMS } = require('../../core/sender/twilio');

const msg = (items) => {
    const csvHeader = 'nombre,descripcion,precio,cantidad';
    const csvLines = items.map(item => `${item.nombre},${item.precio},${item.cantidad}`);
    const csv = `${csvHeader}\n${csvLines.join('\n')}`;
    return csv
}
module.exports = {
    async findAll() {
        const ordenes = await ordenModel.find();
        return ordenes;
    },
    async findByPk(id) {
        try {
            const orden = await ordenModel.findById(id);
            return orden
        } catch (error) {
            return null;
        }
    },
    async create(idUser, idCar) {
        try {
            const carrito = await carritoService.findByPk(idCar);
            const productos = carrito.productos;
            if (productos.length == 0) {
                throw new ValidationError('No Existen productos')
            }
            let total = 0;
            let items = productos.map(x => {
                total += (x.precio * x.cantidad);
                return {
                    id: x.id,
                    nombre: x.nombre,
                    descripcion: x.descripcion,
                    codigo: x.codigo,
                    foto: x.foto,
                    precio: x.precio,
                    cantidad: x.cantidad,
                }
            });

            const newOrden = new ordenModel({ id_usuario: idUser, total, items });
            await newOrden.save();
            const usuario = await usuarioService.findByPk(idUser)
            const { name } = usuario;
            const body = msg(items);
            await sendMail({
                email : process.env.GLOBAL_MAIL,
                asunto: `NUEVO PEDIDO DE ${name.toUpperCase()}`,
                texto: body
            });
            await sendWhatsApp(body);
            await sendSMS('ha sido recibido y se encuentra en proceso.');
            return newOrden;
        } catch (error) {
            console.log(error);
        }

        return null;
    },
    async update(id, orden) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const upProducto = await ordenModel.findByIdAndUpdate(id, orden, { new: true });
            return upProducto
        }
        return null
    },
    async delete(id) {
        const isExists = await module.exports.findByPk(id);
        if (isExists) {
            const delProducto = await ordenModel.findByIdAndDelete(id, { new: true });
            return delProducto
        }
        return null
    },
};
