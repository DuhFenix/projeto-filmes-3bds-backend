import pool from "../../db";

async function getFilmes(){
    const sql = 'SELECT * FROM filmes';
    const [result] = await pool.execute(sql);
    return result;
}

export default getFilmes;