import express, { Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GetComics, AddComic } from "./routes";

dotenv.config();

const app = express();
const port = process.env.port;

app.use(express.json())
app.use(cors())

import sqlite3 from 'sqlite3';

// Create a new SQLite database and open a connection
export const db = new sqlite3.Database('./comictracker.db');

// Create the "comics" table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS "comics" (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    publisher_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    issue INTEGER NOT NULL,
    year INTEGER NOT NULL,
    writer_id INTEGER NOT NULL,
    penciller_id INTEGER NOT NULL,
    FOREIGN KEY (publisher_id) REFERENCES publishers(id),
    FOREIGN KEY (writer_id) REFERENCES writers(id),
    FOREIGN KEY (penciller_id) REFERENCES pencillers(id)
  )`);
});

// Create the other referenced tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS publishers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS writers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pencillers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);
});

// Populate the publishers table with initial data
// db.serialize(() => {
//   const publishers = ['Marvel', 'DC', 'Image', 'Manga'];

//   const insertPublisher = db.prepare('INSERT IF NOT EXISTS INTO publishers (name) VALUES (?)');

//   publishers.forEach((publisher) => {
//     insertPublisher.run(publisher);
//   });

//   insertPublisher.finalize();
// });


app.get("/", (_, res) => res.send("Express + Typescript Server running"));

app.get('/comics', GetComics);


app.post('/comics', AddComic);

app.listen(port, () => console.log(`Server running on port ${port}`));
