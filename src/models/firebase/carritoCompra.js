class CarritoCompra {
    constructor(data) {
        this.id = data.id ;
        this.timestamp = data.timestamp ;
        this.productos = data.productos
    }  

    getId () { return this.id;}
    setId (id) { this.id = id; }

    getTimestamp () { return this.timestamp;}
    setTimestamp (timestamp) { this.timestamp = timestamp; }

    getProductos () { return this.productos;}
    setProductos (productos) { this.nomproductosbre = productos; }

}

module.exports = {CarritoCompra}