import { IFilmes } from "../../Interfaces/IFilmes";


function createFilme(filme :  IFilmes) {
    const createFilme = IFilmes.safeParse(filme);

    if (!createFilme.success) {
        return createFilme.error.format();
    }
    else{
        return ("filme criado com sucesso!")
    }
}

export default createFilme;