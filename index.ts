import express from "express";
import filmesRoutes from "./modules/Filmes/filmesRoutes";
import pool from "./db";

try {
  const app = express();
  const port = 3000;

  const [rows] = await pool.query('SELECT NOW() AS now');
  console.log('DB conectado, resultado:', rows);

  app.use(express.json());


  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  filmesRoutes(app);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
} catch (err) {
  console.error('Erro de conexão:', err);
}