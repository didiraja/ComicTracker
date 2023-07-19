import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { StartingDB } from "./services/database";
import { GetDashData, AddComic, AddEntry, EditComic, DeleteComic } from "./services/routes";

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

/**
 * GET
 */
app.get("/", (_, res) => res.status(200).send('<h1>Server up and running</h1>'));

app.get('/dashboard', GetDashData);

app.get('/comic/:id', DeleteComic);

app.get("*", (_, res) => res.status(404).send({
  msg: "Nothing to see here"
}));

/**
 * POST
 */
// app.post('/entry', AddEntry);

app.post('/comics', AddComic);

// app.post('/comic', EditComic);