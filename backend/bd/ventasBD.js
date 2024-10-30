const ventasBD = require("./conexion").Ventas;
const { buscarPorIdProducto } = require('./productoBD');  // Función para buscar productos
const { buscarPorId } = require('./usuarioBD');
const Ventas = require("../modelos/VentasModelo");

function validarDatos(venta){
    var valido=false;
    if(venta.idusuario!=undefined && venta.idproducto!=undefined&&venta.fechayhora!=undefined && venta.cantidad!=undefined && venta.estatus!=undefined){
        valido=true;
    }
    return valido;
}

async function mostrarventas(){
    try {
        const snapshot = await ventasBD.get();  // ventasBD es la referencia a la colección
        const ventasValidos = [];

        if (snapshot.empty) {
            console.log('No se encontraron ventas');
            return ventasValidos;  // Devuelve un arreglo vacío si no hay documentos
        }

        // Itera sobre los documentos en el snapshot
        snapshot.forEach(doc => {
            const venta = new Ventas({ id: doc.id, ...doc.data() });
            if (validarDatos(venta.getVentas)) {
                ventasValidos.push(venta.getVentas);
            }
        });

        return ventasValidos;
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        return [];
    }
}


async function buscarPorIdventa(id){
    const usuario=await ventasBD.doc(id).get();
    const usuario1=new Ventas({id:usuario.id, ...usuario.data()});
    var usuarioValido;
    if (validarDatos(usuario1.getVentas)){
        usuarioValido=usuario1.getVentas;
    }
    //console.log(usuarioValido);
    return usuarioValido;
}


async function actualizarVenta(id, nuevoEstatus) {
    // Buscar la venta por su ID
    var usuarioValido = await buscarPorIdventa(id);
    var ventaActualizada = false;
    
    if (usuarioValido) {
        try {
            
            await ventasBD.doc(id).update({ estatus: nuevoEstatus });
            ventaActualizada = true;
        } catch (error) {
            console.error('Error al actualizar el estatus:', error);
        }
    }

    return ventaActualizada;
}

async function agregarVenta(idusuario, idproducto, cantidad, estatus) {
    // Validar que los IDs y la cantidad sean correctos
    if (!idusuario || !idproducto || cantidad <= 0 || !estatus) {
        throw new Error('Datos de la venta no válidos');
    }

    // Verificar si el usuario existe
    const usuario = await buscarPorId(idusuario);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    // Verificar si el producto existe
    const producto = await buscarPorIdProducto(idproducto);
    if (!producto) {
        throw new Error('Producto no encontrado');
    }

    // Verificar si hay suficiente cantidad del producto en inventario
    if (producto.cantidad < cantidad) {
        throw new Error('Cantidad insuficiente del producto en inventario');
    }

    // Crear el objeto de la nueva venta
    const nuevaVenta = {
        idusuario,
        idproducto,
        cantidad,
        estatus,
        fechayhora: new Date()  // Guardar la fecha como Timestamp
    };

    try {
        // Agregar la nueva venta a la base de datos
        const ventaRef = await ventasBD.add(nuevaVenta);
        return { id: ventaRef.id, ...nuevaVenta };  // Retornar la venta creada con su ID
    } catch (error) {
        console.error('Error al agregar la venta:', error);
        throw error;
    }
}

async function editarVenta(id, nuevaCantidad) {
    const ventaValida = await buscarPorIdventa(id); // Obtener la venta existente

    if (!ventaValida) {
        return false; // Si la venta no existe, devolver false
    }

    // Actualizar solo la cantidad de la venta
    await ventasBD.doc(id).update({
        cantidad: nuevaCantidad // Actualizar la cantidad
    });

    return true; // Devolver true si la actualización fue exitosa
}
async function cancelSale(id) {
    const ventaValida = await buscarPorId(id);
    
    if (ventaValida) {
        // Marcar la venta como cancelada
        await ventasBD.doc(id).update({
            estado: 'cancelado'
        });
        return true;
    }
}

module.exports = {
    mostrarventas,
    buscarPorIdventa,
    actualizarVenta,
    agregarVenta,editarVenta,cancelSale // Exporta esta función aquí
};

//Revisar cuando si existe el usuario, pero el usuario es incorrecto
//deleteUser("100");

/*data={
    nombre:"Juana Martinez",
    usuario:"abc",
    password:"abc"
}

async function prueba() {
    console.log(await newUser(data));
}

prueba();*/
//busXId("300");
//mostrarUsuarios();