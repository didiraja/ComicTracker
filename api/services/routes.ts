import { Request, Response } from "express"
import { db } from "./database";
import { NameFromID } from "../types";
import { QUERIES }  from '../enum';

export const GetComics = (_: Request, res: Response) => {

  db.all(QUERIES.GET_COMICS, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        msg: "Something went wrong. Couldn't found comics."
      });
    } 

    res.status(200).json(rows);
  });
}

export const AddComic = (req: Request, res: Response) => {

  const { publisher_id, title, issue, year, writer_id, illustrator_id } = req.body;

  // INSERT ITSELF
  db.run(
    `INSERT INTO comics (publisher_id, title, issue, year, writer_id, illustrator_id)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [publisher_id, title, issue, year, writer_id, illustrator_id],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create comic' });
      }
    }
  );
  
  // BUILD RESPONSE DATA
  async function getNameFromIds() {
    
    const result: NameFromID[] = await new Promise((resolve, reject) => {
      db.all(`SELECT 'publishers' AS key, name FROM publishers WHERE id = ${publisher_id}
      UNION ALL
      SELECT 'writers' AS key, name FROM writers WHERE id = ${writer_id}
      UNION ALL
      SELECT 'illustrators' AS key, name FROM illustrators WHERE id = ${illustrator_id};`, (err: any, rows: NameFromID[]) => {
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
      illustrator_id: result[2].name
    }

    res.status(200).send({
      msg: "Comic added sucessfully!",
      data: response,
    });
  }

  return getNameFromIds();
}