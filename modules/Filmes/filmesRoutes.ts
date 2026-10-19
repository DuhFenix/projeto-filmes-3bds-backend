import express from "express"
import { IFilmes } from "../../Interfaces/IFilmes";
import createFilme from "./createFilme";
import { IResponse } from "../../Interfaces/IResponse";

function filmesRoutes(app: express.Application) {
    app.get("/filmes", (req, res) => {
        res.send("Rota de filmes");
    });
    app.post("/filmes", async (req, res) => {
        try {
            const resultado = IFilmes.safeParse(req.body);
            if (!resultado.success) {
                // ✨ MAPEAMENTO DIRETO: Extrai apenas a propriedade .message de cada erro encontrado
                const mensagensDoZod = resultado.error.issues.map(issue => issue.message);

                const respostaErro: IResponse = {
                    sucesso: false,
                    // Junta todas as mensagens pulando uma linha para o seu alert no front
                    mensagem: "Erros de validação:\n" + mensagensDoZod.join("\n")
                };

                return res.status(400).json(respostaErro);
            }
            else {
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