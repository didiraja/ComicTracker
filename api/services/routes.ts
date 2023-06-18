import { Request, Response } from "express"
import { db } from "./database";
import { InterfaceComic, NameFromID } from "../types";
import { QUERIES }  from '../enum';

// C
export const AddComic = (req: Request, res: Response) => {

  const { publisher_id, title, issue, year, writer_id, illustrator_id }: InterfaceComic = req.body;

  try {
    db.run(QUERIES.NEW_COMIC,
      [publisher_id, title, issue, year, writer_id, illustrator_id],
      function (err) {
  
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to create comic' });
        }
      }
    );
  } catch {
    res.status(500).json({ error: 'Failed to complete operation' });
  }
  
  // BUILD RESPONSE DATA
  async function getNameFromIds() {
    
    const result: NameFromID[] = await new Promise((resolve, reject) => {
      db.all(`SELECT 'publishers' AS key, name FROM publishers WHERE id = ${publisher_id}
      UNION ALL
      SELECT 'writers' AS key, name FROM writers WHERE id = ${writer_id}
      UNION ALL
      SELECT 'illustrators' AS key, name FROM illustrators WHERE id = ${illustrator_id};`,
      (err: any, rows: NameFromID[]) => {
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

// R
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

// U
export const EditComic = (req: Request, res: Response) => {

  const { id, publisher_id, title, issue, year, writer_id, illustrator_id }: InterfaceComic = req.body;

  try {
    db.run(QUERIES.EDIT_COMIC,
      [publisher_id, title, issue, year, writer_id, illustrator_id, id],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to update comic' });
        } else {
          res.status(200).json({ message: 'Comic updated successfully' });
        }
      }
    );
  } catch {
    res.status(500).json({ error: 'Failed to complete operation' });
  }
  
}

// D
export const DeleteComic = (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    db.run(QUERIES.DELETE_COMIC, [id],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to delete comic' });
        } else if (this.changes === 0) {
          res.status(404).json({ error: 'Comic not found' });
        } else {
          res.status(200).json({ message: 'Comic deleted successfully' });
        }
      }
    );
  } catch {
    res.status(500).json({ error: 'Failed to complete operation' });
  }
}