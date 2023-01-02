module.exports = (req, res, next) => {
  const database = req.headers.database;
  switch (database) {
    case 'mongodb':
      next();
      break;
    case 'firebase':
      next();
      break;
    default:
        res.status(400).json({ 
            error : -2,
            msg : 'Base de datos no especificada',
            descripcion:`Agrege en los Headers la base de datos (header : database , value : (mongodb o firebase)) ` 
        });
  }

};
