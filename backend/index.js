const express=require("express");
const cors=require("cors");
const usuariosRutas=require("./routes/rutasUsuarios");

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use("/", usuariosRutas);
const port=process.env.PORT||3000;
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
