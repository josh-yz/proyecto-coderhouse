const express = require('express');
const app = express();
const path = require('path')
const compression = require('compression');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport');


const mongodb = require('./core/database/mongodb-connect')
require('dotenv').config()
require('./core/passport/local-auth');
const log4js = require('./core/utils/logs')


const loggerConsole = log4js.getLogger('default')
const loggerArchiveWarn = log4js.getLogger('warnArchive')
const loggerArchiveError = log4js.getLogger('errorArchive')


app.use((req, res, next) => {
  loggerConsole.info(`
  Ruta  ${req.originalUrl}
  Metodo ${req.method}`)
  next()
})

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
        useNewUrlParser: false,
        useUnifiedTopology: false,
      },
      ttl: 3600, // 1 hour in seconds
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const routes = require('./api/routes');

const PORT = process.env.PORT || 8081;
const ROUTE = '/api/';


app.use(ROUTE, routes);
app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Not found" })
  loggerArchiveError.warn(`
  Estado: 404
  Ruta: ${req.originalUrl}
  Metodo ${req.method}`)
})

app.listen(PORT, () => {
  mongodb.dbConnection();
  loggerConsole.debug(`🚀 Servidor en puerto :${PORT}${ROUTE}`)
});


///https://morioh.com/p/07175e64126a