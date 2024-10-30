const admin = require("firebase-admin");
const keys=require("../keeys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

const proyecto=admin.firestore();
const usuarios=proyecto.collection("miejemploBD");
const productos=proyecto.collection("productos");
const Ventas=proyecto.collection("ventas");

/*async function probarConexion() {
    try {
        const snapshot = await Ventas.get();

        if (snapshot.empty) {
            console.log('No se encontraron documentos en la colección "ventas".');
            return;
        }

        snapshot.forEach(doc => {
            console.log(`Documento ID: ${doc.id}, Datos: `, doc.data());
        });

    } catch (error) {
        console.error('Error al obtener documentos:', error);
    }
}

// Llamar a la función para probar la conexión
//probarConexion();
/*productos.get().then(snapshot => {
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });
}).catch(error => {
    console.log('Error al obtener productos:', error);
});*/
module.exports={admin,
    usuarios,
    productos,Ventas
}