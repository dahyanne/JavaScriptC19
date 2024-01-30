const { error } = require("console");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const mongoUri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", mongoUri);

mongoose
.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("conectado a MongoDB");
}).catch((err) => {
    console.error(err);
});

const db = mongoose.connection;

db.on("Error", console.error.bind(console, "Eroore de conexion"));

db.once("open", () =>{
    console.log("conectado a mongodb");
})

const  alimentoSchema = new mongoose.Schema({
    id: Number,
    codigo: Number,
    grupo: Number,
    nombre: String
})


const alimento = mongoose.model("alimento", alimentoSchema);



app.get("/", (req, res) => {
    res.send("Bienvenidos a la lista de alimentos");
});

app.get("/alimentos",async (req , res) => {
    try{
        const Alimentos = await alimento.find();
        res.json(alimentos);

    } catch (error){
        res.status(500).send("Error al obtener alimentos")
    }
});
app.post("/alimentos", async (req, res) =>{
    const  alimento = new Alimento({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        grupo: req.body.grupo,
        subgrupo: req.body.subgrupo
     });
     try{
        await Alimento.save();
        res.json(Alimento);
     }catch (error){
        res.status(500).send("Error al guardar alimento")
     }
    });

    app.put("/alimentos/:id"), async (req, res) => {
        try{
            const alimento = await Alimento.finByIdAndUpdate(
                req.params.id, {codigo: req.body.codigo,nombre: req.body.nombre,grupo: req.body.grupo,subgrupo: req.body.subgrupo}, {new: true}
            );
            if(alimento){
                res.json(alimento);
            }else{
                res.status(404).send("alimento no encontrado");
            }

        } catch(error){
            res.status(500).send("Error al actualizar el alimento")
        }};


        app.delete("/alimentos/:id"), async (req, res) => {
            try{
                const alimento = await Alimento.finByIdAndDelete(req.params.id);
                
                if(alimento){
                    res.json(alimento);
                }else{
                    res.status(404).send("alimento eliminado");
                }
    
            } catch(error){
                res.status(500).send("Error al eliminar el alimento")
            }};

app.get("/alimentos/:id", async (req, res) => {
    try{
        const alimento = await alimentos.finById(req.params.id);
        if(alimento){
            res.json(alimento);
        }else{
            res.status(404).send("Alimento no encontrado");
        }
    } catch(error){
        res.status(500).send("Error al buscar el alimento")

    }   
});

module.exports = app;