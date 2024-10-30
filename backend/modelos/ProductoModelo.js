class Producto {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.cantidad = data.cantidad;
        this.precio = data.precio;
    }

    set id(id) {
        this._id = id;
    }
    set nombre(nombre) {
        const nombreRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*$/;
        if (nombreRegex.test(nombre)) {
            this._nombre = nombre;
        } else {
            console.error("El nombre no cumple con el formato adecuado");
        }
    }
    
    
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }

    set precio(precio) {
        this._precio = precio;
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get cantidad() {
        return this._cantidad;
    }

    get precio() {
        return this._precio;
    }

    // Devuelve un objeto con o sin 'id', dependiendo de si el 'id' está definido
    get getProducto() {
        const conid = {
            id: this.id,
            nombre: this.nombre,
            cantidad: this.cantidad,
            precio: this.precio
        };
        const sinid = {
            nombre: this.nombre,
            cantidad: this.cantidad,
            precio: this.precio
        };
        return this.id === undefined ? sinid : conid;
    }
}

module.exports = Producto;
