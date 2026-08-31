import express from "express"
import { IFilmes } from "../../Interfaces/IFilmes";
import createFilme from "./createFilme";

function filmesRoutes(app : express.Application) {
    app.get("/filmes", (req, res) => {
        res.send("Rota de filmes");
    });
    app.post("/filmes", (req, res) => {
        const filme : IFilmes = req.body;
        const result = createFilme(filme);
        res.send(result);
    });
}

export default filmesRoutes;