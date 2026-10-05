import pool from "../../db";
import { IFilmes } from "../../Interfaces/IFilmes";

async function createFilme(filme: IFilmes) {
  const sql = 'INSERT INTO filmes (`name`, `description`, `video`, `imagem`) VALUES (?, ?, ?, ?)';
  const [result] = await pool.execute(sql, [filme.name, filme.description, filme.video, filme.imagem]);

  // mysql2 returns an OkPacket for INSERT with insertId
  const insertId = (result as any).insertId;
  if (insertId) {
    console.log("O ID inserido foi:", insertId);
  }

  return insertId;
}

export default createFilme;