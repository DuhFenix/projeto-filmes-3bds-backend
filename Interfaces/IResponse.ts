import { IFilmes } from "./IFilmes";

export interface IResponse {
    sucesso: boolean;
    mensagem: string;
    dados? : IFilmes[]
}