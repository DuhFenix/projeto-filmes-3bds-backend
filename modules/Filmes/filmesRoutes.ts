import express from "express"
import { IFilmes } from "../../Interfaces/IFilmes";
import createFilme from "./createFilme";

function filmesRoutes(app: express.Application) {
    app.get("/filmes", (req, res) => {
        res.send("Rota de filmes");
    });
    app.post("/filmes", (req, res) => {
        const resultado = IFilmes.safeParse(req.body);

        if (!resultado.success) {
            res.send(resultado.error.flatten());
        }
        else {
            return createFilme(resultado.data);
        }
    });
}

export default filmesRoutes;