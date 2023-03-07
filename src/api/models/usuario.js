const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { phone } = require('phone');

const ValidationError = require('../../core/errors/validationError');

const usuarioSchema = Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Expresión regular para validar el formato de un correo electrónico
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(v);
      },
      message: '|El correo electrónico {VALUE} no es válido'
    }
  },
  password: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const phoneNumber = phone(v);
        return phoneNumber.isValid && v.length > 0;
      },
      message: '|El número de teléfono {VALUE} no es válido con prefijo internacional!!'
    }
  },
  photo: { type: String, required: true }
});

usuarioSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

usuarioSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}


// Validación personalizada para verificar si el correo electrónico ya está en uso
usuarioSchema.methods.validateEmailNotTaken = async function () {
  const user = await this.constructor.findOne({ email: this.email });
  if (user) {
    throw new ValidationError('El correo electrónico ya está en uso.');
  }
};


module.exports = model('Usuario', usuarioSchema) 