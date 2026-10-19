import pool from "../../db";
import { IResponse } from "../../Interfaces/IResponse";

async function deleteFilme(id: number) {
    const sql = `DELETE FROM filmes WHERE id = ?`;
    try {
        const [result] = await pool.execute(sql, [id]);
        // result vem do mysql2; cast para acessar affectedRows
        const r: any = result;
        if (r && r.affectedRows && r.affectedRows > 0) {
            return "Filme excluído com sucesso!";
        }
        return "Nenhum filme encontrado com esse id.";
    } catch (error) {
        // Log opcional do erro para debug (não expor detalhes ao cliente)
        console.error('Erro ao executar DELETE:', error);
        throw error;
    }
}

export default deleteFilme