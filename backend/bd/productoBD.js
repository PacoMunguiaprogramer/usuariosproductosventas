const productosBD = require("./conexion").productos;  // Cambiamos a productos
const Producto = require("../modelos/ProductoModelo"); // Cambiamos a ProductoModelo

// Función para validar los datos del producto
// Función para validar los datos del producto
function validarDatos(producto) {
    var valido = true;

    // Asegurarse de que nombre, cantidad y precio están definidos
    if (!producto.nombre || !producto.cantidad || !producto.precio) {
        valido = false;
    }

    // Validar formato del nombre (primera letra en mayúscula y solo letras)
    const nombreRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ']{1,}$/;
    if (!nombreRegex.test(producto.nombre)) {
        console.error("El nombre no cumple con el formato adecuado");
        valido = false;
    }

    // Validar que la cantidad sea un número mayor que 0
    if (isNaN(producto.cantidad) || producto.cantidad <0) {
        console.error("Cantidad de producto insuficiente");
        valido = false;
    }

    // Validar que el precio sea un número mayor que 0
    if (isNaN(producto.precio) || producto.precio < 0) {
        console.error("El precio debe ser  mayor que 0");
        valido = false;
    }

    return valido;
}


// Función para mostrar los productos
async function mostrarProductos() {
    const productos = await productosBD.get();  // Obtener los productos de la BD
    const productosValidos = [];

    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        // Validamos el producto
        if (validarDatos(producto1.getProducto)) {
            productosValidos.push(producto1.getProducto);
        }
    });

    return productosValidos;  // Devolvemos los productos válidos
}

// Función para buscar un producto por ID
async function buscarPorIdProducto(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });

    var productoValido;
    if (validarDatos(producto1.getProducto)) {
        productoValido = producto1.getProducto;
    }

    return productoValido;
}

// Función para agregar un nuevo producto
async function newProduct(data) {
    const producto1 = new Producto(data);  // Creamos una nueva instancia de Producto
    var productoValido = false;

    if (validarDatos(producto1.getProducto)) {
        // Guardamos el nuevo producto en la base de datos
        await productosBD.doc().set(producto1.getProducto);
        productoValido = true;
    }

    return productoValido;
}

// Función para eliminar un producto por ID
async function eliminarProducto(id) {
    const productoValido = await buscarPorIdProducto(id);  // Buscamos el producto por ID
    var productoBorrado = false;

    if (productoValido) {
        await productosBD.doc(id).delete();  // Eliminamos el producto si es válido
        productoBorrado = true;
    }

    return productoBorrado;
}

// Editar producto por ID
async function editarProd(id, data) {
    const productoExistente = await buscarPorIdProducto(id);
    var productoActualizado = false;

    if (productoExistente) {
        const productoNuevo = new Producto(data);

        if (validarDatos(productoNuevo.getProducto)) {
            await productosBD.doc(id).update(productoNuevo.getProducto);
            productoActualizado = true;
        }
    }
    return productoActualizado;
}

// Exportamos las funciones
module.exports = {
    mostrarProductos,
    buscarPorIdProducto,
    eliminarProducto,
    newProduct,validarDatos,editarProd
};
