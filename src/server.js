const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const routes = require('./routes');

const PORT = process.env.PORT || 8080;
const ROUTE = '/api/';



app.use(ROUTE,routes);
app.use("/*", (req, res, next) => {
    res.status(404).json({message: "Not found"})
  })

app.listen(PORT,  () => {
    console.log(`🚀 Servidor en puerto :${PORT}${ROUTE}`);
});
