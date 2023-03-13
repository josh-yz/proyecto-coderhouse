const {Schema , model} = require('mongoose');

const CarritoShema = Schema({
    productos:[{
        id : {
            type : String,
            required : true
        },
        nombre : {
            type : String,
            required : true
        },
        descripcion : {
            type : String,
            required : true
        },
        codigo : {
            type : String,
            required : true
        },
        foto : {
            type : String,
            required : true
        },
        precio : {
            type : Number,
            required : true
        },
        cantidad : {
            type : Number,
            required : true
        }, 
    }] 
},{ timestamps: true });


module.exports = model('Carrito',CarritoShema) 