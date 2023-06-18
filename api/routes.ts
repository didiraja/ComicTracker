import { Request, Response } from "express"
import { db } from ".";
import { NameFromID } from "./types";

export const GetComics = (_: Request, res: Response) => {
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
}

export const AddComic = (req: Request, res: Response) => {
  const { publisher_id, title, issue, year, writer_id, penciller_id } = req.body;

  db.run(
    `INSERT INTO comics (publisher_id, title, issue, year, writer_id, penciller_id)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [publisher_id, title, issue, year, writer_id, penciller_id],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create comic' });
      }
    }
  );
  
  async function getNameFromIds() {
    
    const result: NameFromID[] = await new Promise((resolve, reject) => {
      db.all(`SELECT 'publishers' AS key, name FROM publishers WHERE id = ${publisher_id}
      UNION ALL
      SELECT 'writers' AS key, name FROM writers WHERE id = ${writer_id}
      UNION ALL
      SELECT 'pencillers' AS key, name FROM pencillers WHERE id = ${penciller_id};`, (err: any, rows: NameFromID[]) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const response = {
      title,
      publisher_id: result[0].name,
      issue,
      year,
      writer_id: result[1].name,
      penciller_id: result[2].name
    }

    res.status(200).send({
      msg: "Comic added sucessfully!",
      data: response,
    });
  }

  return getNameFromIds();
}