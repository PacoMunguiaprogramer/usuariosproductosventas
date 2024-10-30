const { admin } = require('../bd/conexion');

class Ventas {
    constructor(data) {
        this.id = data.id;
        this.idusuario=data.idusuario;
        this.idproducto = data.idproducto;
        this.fechayhora=data.fechayhora;
        this.cantidad = data.cantidad;
        this.estatus = data.estatus;
    }

    set id(id) {
        this._id = id;
    }
    set idusuario(idusuario) {
        this._idusuario = idusuario;
    }
    set idproducto(idproducto) {
        this._idproducto = idproducto;
    }
    
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }

    set estatus(estatus) {
        this._estatus = estatus;
    }
    set fechayhora(fechayhora) {
        // Verifica si 'fechayhora' es un Timestamp de Firestore y lo convierte a Date
        if (fechayhora instanceof admin.firestore.Timestamp) {
            this._fechayhora = fechayhora.toDate();  // Convierte Timestamp a Date
        } else if (fechayhora instanceof Date) {
            this._fechayhora = fechayhora;  // Si ya es un objeto Date, lo asigna directamente
        } else {
            throw new Error("fechayhora debe ser un objeto Date o un Timestamp de Firestore");
        }
    }
    get id() {
        return this._id;
    }

    get idusuario() {
        return this._idusuario;
    }

    get idproducto() {
        return this._idproducto;
    }
get fechayhora(){
    return this._fechayhora;
}
    get cantidad() {
        return this._cantidad;
    }

    get estatus(){
        return this._estatus;
    }

    // Devuelve un objeto con o sin 'id', dependiendo de si el 'id' está definido
    get getVentas() {
        const conid = {
            id: this.id,
            idusuario: this.idusuario,
            idproducto: this.idproducto,
           fechayhora: this.fechayhora,
            cantidad: this.cantidad,
            estatus: this.estatus
        };
        const sinid = {
            idusuario:this.idusuario,
            idproducto: this.idproducto,
            fechayhora: this.fechayhora,
            cantidad: this.cantidad,
            estatus: this.estatus
        };
        return this.id === undefined ? sinid : conid;
    }
}

module.exports = Ventas;