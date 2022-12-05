class Producto {
    constructor(data) {
        this.id = data.id ;
        this.timestamp = data.timestamp ;
        this.nombre = data.nombre ;
        this.descripcion = data.descripcion ;
        this.codigo = data.codigo ;
        this.foto = data.foto ;
        this.precio = data.precio ;
        this.stock = data.stock ;
    }  

    getId () { return this.id;}
    setId (id) { this.id = id; }

    getTimestamp () { return this.timestamp;}
    setTimestamp (timestamp) { this.timestamp = timestamp; }

    getNombre () { return this.nombre;}
    setNombre (nombre) { this.nombre = nombre; }

    getNombre () { return this.nombre;}
    setNombre (nombre) { this.nombre = nombre; }

    getDescripcion () { return this.descripcion;}
    setDescripcion (descripcion) { this.descripcion = descripcion; }

    getCodigo () { return this.codigo;}
    setCodigo (codigo) { this.codigo = codigo; }

    getFoto () { return this.foto;}
    setFoto (foto) { this.foto = foto; }

    getPrecio () { return this.precio;}
    setPrecio (precio) { this.precio = precio; }

    getStock () { return this.stock;}
    setStock (stock) { this.stock = stock; }
    
}

module.exports = {Producto}

