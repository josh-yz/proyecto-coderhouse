const express = require('express');
const app = express();
const path = require('path')
const compression = require('compression');
const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongodb = require('./core/database/mongodb-connect')
require('dotenv').config()



//Comprimir todas las respuestas HTTP
app.use(compression({
    level: 3, // nivel de compresion
    threshold: 10 * 1000, // umbral 
    filter: (req, res) => {
         if (req.headers['x-no-compression']) { // por si el navegador no compatible 
              return false;
         }
         return compression.filter(req, res);
    }
}));
app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.SESSIONS,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        ttl: 100,
      }),
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const routes = require('./api/routes');

const PORT = process.env.PORT || 8081;
const ROUTE = '/api/';


app.use(ROUTE,routes);
app.use("*", (req, res, next) => {
    res.status(404).json({message: "Not found"})
})

app.listen(PORT,  () => {
    mongodb.dbConnection();
    console.log(`🚀 Servidor en puerto :${PORT}${ROUTE}`);
});


///https://morioh.com/p/07175e64126a