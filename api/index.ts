import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { StartingDB } from "./services/database";
import { GetComics, AddComic, EditComic, DeleteComic } from "./services/routes";

/**
 * DATABASE
 */
StartingDB()

/**
 * API
 */
dotenv.config();

const app = express();
const port = process.env.port;

app.use(express.json())
app.use(cors())

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('/comics', GetComics);

app.post('/comics', AddComic);

app.post('/comic', EditComic);

app.get('/comic/:id', DeleteComic);

app.get("*", (_, res) => res.status(404).send({
  msg: "What are you doing here?"
}));