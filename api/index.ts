import express, { Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { QUERIES } from "./enum";

dotenv.config();

const app = express();
const port = process.env.port;

app.use(express.json())
app.use(cors())

import sqlite3 from 'sqlite3';
import { isNumberObject } from "util/types";

// Create a new SQLite database and open a connection
const db = new sqlite3.Database('./comictracker.db');

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


app.get("/", (req, res) => {
  res.send("Express + Typescript Server running");
});

app.get('/comics', (req, res) => {
  const categories = ['comics', 'publishers', 'writers', 'pencillers'];
  const data: any = {};

  categories.forEach((cat) => {
    db.all(`SELECT * FROM ${cat}`, (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        data[cat] = rows;
      }

      // Check if all categories have been processed
      if (Object.keys(data).length === categories.length) {
        res.status(200).json(data);
      }
    });
  });
});


app.post('/comics', async (req, res) => {

  const { publisher_id, title, issue, year, writer_id, penciller_id } = req.body;
  
  async function writerName() {
    let output: any = {
      "title": "Asdfdsfsd dsFDSFsd",
      "publisher_id": 2,
      "issue": "5",
      "year": "2006",
      "writer_id": '',
      "penciller_id": 3
    }

    try {
      const writer: {id: number, name: string} = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM writers WHERE id = ${writer_id}`, (err: any, rows: {id: number, name: string}) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      
      output['writer_id'] = writer.name;
    } catch (err) {
      console.error(err);
      return null;
    }

    res.status(200).send(output);
  }

  return writerName();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
