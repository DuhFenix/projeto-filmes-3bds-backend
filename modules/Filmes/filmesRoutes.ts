import express from "express"
import { IFilmes } from "../../Interfaces/IFilmes";
import createFilme from "./createFilme";

function filmesRoutes(app: express.Application) {
    app.get("/filmes", (req, res) => {
        res.send("Rota de filmes");
    });
    app.post("/filmes", async (req, res) => {
        try {
            const resultado = IFilmes.safeParse(req.body);

            if (!resultado.success) {
                return res.status(400).json({erro: resultado.error.flatten()})
            }
            else{
                 const filme = req.body;

                const novoId = await createFilme(filme); // Guarda o ID retornado pela função

                // ✨ ADICIONE ESTA LINHA ABAIXO PARA RESPONDER O FRONT-END:
                return res.status(201).json({ id: novoId, mensagem: "Filme Cadastrado com sucesso!" + novoId });
            }


        } catch (error) {
            return res.status(500).json({ erro: "Erro ao cadastrar filme" });
        }
    });

}

export default filmesRoutes;