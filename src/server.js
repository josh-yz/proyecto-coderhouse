const express = require('express');
const app = express();
const path = require('path')
const mongodb = require('./database/mongodb/mongodb-connect')


const selectDatabase = require('./middlewares/selectDatabase');
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const routes = require('./routes');

const PORT = process.env.PORT || 8080;
const ROUTE = '/api/';


// Seleccionar la base de datos especificada
app.use(selectDatabase);


app.use(ROUTE,routes);
app.use("/*", (req, res, next) => {
    res.status(404).json({message: "Not found"})
})

app.listen(PORT,  () => {
    mongodb.dbConnection();
    console.log(`🚀 Servidor en puerto :${PORT}${ROUTE}`);
    
});
