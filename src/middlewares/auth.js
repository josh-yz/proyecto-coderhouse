module.exports = (req, res, next) => {


    if (!req.headers.permiso) {
        res.status(401).json({ msg :'Falta ingresar headers permiso '});
    } else {
        let permiso = req.headers.permiso;
        if(permiso == 'admin'){
            next();
        }else{
            res.status(401).json({ error : -1,descripcion:`ruta ${req.originalUrl} metodo ${req.method} no autorizado` });
        }
    }


};
