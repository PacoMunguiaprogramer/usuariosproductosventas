var rutas=require("express").Router();
//var {Router}= require("express");
var {mostrarUsuarios,buscarPorId,eliminarUsuario,newUser,actualizarUsuario}= require("../bd/usuarioBD");
var { mostrarProductos, buscarPorIdProducto, eliminarProducto, newProduct,editarProd } = require("../bd/productoBD");
var { mostrarventas, buscarPorIdventa, actualizarVenta, agregarVenta,actualizarVenta,editarVenta } = require("../bd/ventasBD");
rutas.get("/", async (req, res)=>{
    //res.send("Hola estas en raíz");
   var usuariosValidos= await mostrarUsuarios();
   // console.log(usuariosValidos);
    res.json(usuariosValidos);
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
    var usuarioValido=await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

rutas.delete("/borrarUsuario/:id",async(req,res)=>{
var usuarioBorrado=await eliminarUsuario(req.params.id);
res.json(usuarioBorrado);
});

rutas.post("/nuevoUsuario",async(req,res)=>{
var usuarioValido=await newUser(req.body);
res.json(usuarioValido);
});

rutas.put('/editarusuario/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, usuario, password } = req.body;

    console.log('ID recibido:', id);
    console.log('Datos recibidos:', { nombre, usuario, password });

    try {
        // Verifica si se proporcionan todos los campos necesarios
        if (!nombre || !usuario || !password) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios (nombre, usuario o contraseña)' });
        }

        // Llama a la función para actualizar el usuario
        const resultado = await actualizarUsuario(id, { nombre, usuario, password });
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
    }
});



// Ruta para mostrar todos los productos
rutas.get("/productos", async (req, res) => {
    var productosValidos = await mostrarProductos();
    res.json(productosValidos);
});

// Ruta para buscar un producto por ID
rutas.get("/productos/buscarPorIdProducto/:id", async (req, res) => {
    var productoValido = await buscarPorIdProducto(req.params.id);
    res.json(productoValido);
});

// Ruta para eliminar un producto por ID
rutas.delete("/productos/borrarProducto/:id", async (req, res) => {
    var productoBorrado = await eliminarProducto(req.params.id);
    res.json(productoBorrado);
});

rutas.post("/productos/nuevoProducto", async (req, res) => {
    var productoValido = await newProduct(req.body);
    res.json(productoValido);
});

rutas.put("/editarProducto/:id", async (req, res) => {
    const productoActualizado = await editarProd(req.params.id, req.body);
    res.json(productoActualizado);
});



rutas.post("/agregarVenta", async (req, res) => {
    const { idusuario, idproducto, cantidad, estatus } = req.body;

    try {
        // Llamar a la función para agregar la venta
        const nuevaVenta = await agregarVenta(idusuario, idproducto, cantidad, estatus);
        
        // Si la venta se agregó exitosamente, responder con un código 201 y la venta creada
        res.status(201).json({ mensaje: "Venta agregada exitosamente", venta: nuevaVenta });
    } catch (error) {
        // Si hay un error, responder con un código 500 y el mensaje del error
        res.status(500).json({ mensaje: "Error al agregar la venta", error: error.message });
    }
});


// Ruta para mostrar las ventas
rutas.get("/ventas", async (req, res) => {
    var ventasValidos = await mostrarventas();
    res.json(ventasValidos);
});

// Ruta para buscar una venta por ID
rutas.get("/buscarPorIdventa/:id", async (req, res) => {
    var ventaValido = await buscarPorIdventa(req.params.id);
    res.json(ventaValido);
});



// Ruta para actualizar el estatus de una venta por ID
// Definir los estatus permitidos
const estatusPermitidos = ["vendido", "no vendido"];

rutas.put("/actualizarVenta/:id", async (req, res) => {
    const { estatus } = req.body;  // Estatus enviado en la solicitud

    // Validar que el estatus sea uno de los permitidos
    if (!estatusPermitidos.includes(estatus)) {
        return res.status(400).json({ mensaje: "Estatus no válido. Los valores permitidos son: 'vendido', 'no vendido'" });
    }

    // Si el estatus es válido, actualizamos la venta
    const ventaActualizada = await actualizarVenta(req.params.id, estatus);
    
    if (ventaActualizada) {
        res.json({ mensaje: `Estatus de la venta actualizado a "${estatus}" correctamente` });
    } else {
        res.status(404).json({ mensaje: "Venta no encontrada o error al actualizar" });
    }
});

rutas.patch("/cancelarVenta/:id", async (req, res) => {
    const ventaCancelada = await cancelSale(req.params.id);
    res.json(ventaCancelada);
});
rutas.patch("/editarVenta/:id", async (req, res) => {
    const { cantidad } = req.body; // Suponiendo que la cantidad se envía en el cuerpo de la solicitud
    const ventaEditada = await editarVenta(req.params.id, cantidad);
    res.json(ventaEditada);
});

module.exports=rutas;