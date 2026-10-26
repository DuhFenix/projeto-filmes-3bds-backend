import express from "express"
import { IFilmes } from "../../Interfaces/IFilmes";
import createFilme from "./createFilme";
import { IResponse } from "../../Interfaces/IResponse";
import getFilmes from "./getFilmes";
import deleteFilme from "./deleteFilme";

function filmesRoutes(app: express.Application) {
    app.get("/filmes",async (req, res) => {
       const resultado = await getFilmes();
        let retorno: IResponse;
       if(!resultado){
           retorno = {
               sucesso: false,
               mensagem: "Nenhum filme encontrado"
           };
       } else {
           retorno = {
               sucesso: true,
               mensagem: "Filmes recuperados com sucesso",
               dados: resultado as IFilmes[]
           };
       }
       return res.status(200).json(retorno);
    });
    app.post("/filmes", async (req, res) => {
        try {
            const resultado = IFilmes.safeParse(req.body);
            if (!resultado.success) {
                const mensagensDoZod = resultado.error.issues.map(issue => issue.message);

                const respostaErro: IResponse = {
                    sucesso: false,
                    mensagem: "Erros de validação:\n" + mensagensDoZod.join("\n")
                };

                return res.status(400).json(respostaErro);
            }
            else {
                const filme = req.body;

                const novoId = await createFilme(filme);

                return res.status(201).json({ id: novoId, mensagem: "Filme Cadastrado com sucesso!" + novoId });
            }


        } catch (error) {
            return res.status(500).json({ erro: "Erro ao cadastrar filme" });
        }
    });
    app.delete("/filmes", async (req, res) => {
        try {
            const { id } = req.body;
            if (typeof id === 'undefined') {
                const respostaErro: IResponse = { sucesso: false, mensagem: 'ID não informado' };
                return res.status(400).json(respostaErro);
            }

            const mensagem = await deleteFilme(Number(id));
            const resposta: IResponse = { sucesso: true, mensagem };
            return res.status(200).json(resposta);
        } catch (error) {
            const respostaErro: IResponse = { sucesso: false, mensagem: 'Erro ao excluir filme' };
            return res.status(500).json(respostaErro);
        }
    })

}

export default filmesRoutes;