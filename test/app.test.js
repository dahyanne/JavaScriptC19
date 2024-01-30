const request = require("supertest");

const app= require("../src/index");
const mongoose = require("mongoose");

describe("Enpoints de Alimentos", () =>{
    test("deebria obtener una lista de alimentos y sus grupos", async () =>{
        const res  = await request(app).get("/alimentos")
        
        expect(res.statusCode).roEqual(200);
        
        Expect(Array.isArray(res.body)).toBe(true);
    })
    test("Debería de crear un nuevo alimento", async () => {
        const res = await request(app).post("/alimentos").send({ id: "id nuevo",codigo: " nuevo codigo",grupo: "Nuevo grupo",subgrupo: "Nuevo subgrupo",nombre: "Nuevo Alimento"})

            expect(res.statusCode).ToEqual(200);

            expect(res.body.titulo).ToEqual("Nuevo Alimento");
   
        })

        afterAll(async() => {
            await mongoose.connection.close();
        })
})

