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
  } finally {

    res.status(200).send({
      msg: "Comic added sucessfully!",
    });
  }
}

// R
export const GetDashboardData = (_: Request, res: Response) => {

  async function getEachKey() {

    try {
      const publishers = await new Promise((resolve, reject) => {
        db.all(QUERIES.GET_PUBLISHERS, (err, rows) => {
          if (err) {
            console.error(err);
            reject({
              msg: "Something went wrong. Couldn't found publishers."
            });
          } 
      
          resolve(rows)
        });
      });

      const writers = await new Promise((resolve, reject) => {
        db.all(QUERIES.GET_WRITERS, (err, rows) => {
          if (err) {
            console.error(err);
            reject({
              msg: "Something went wrong. Couldn't found writers."
            });
          } 
      
          resolve(rows)
        });
      });

      const illustrators = await new Promise((resolve, reject) => {
        db.all(QUERIES.GET_ILLUSTRATORS, (err, rows) => {
          if (err) {
            console.error(err);
            reject({
              msg: "Something went wrong. Couldn't found illustrators."
            });
          } 
      
          resolve(rows)
        });
      });

      const comics = await new Promise((resolve, reject) => {
        db.all(QUERIES.GET_COMICS, (err, rows) => {
          if (err) {
            console.error(err);
            reject({
              msg: "Something went wrong. Couldn't found comics."
            });
          } 
      
          resolve(rows)
        });
      });

      const output = {
        publishers,
        writers,
        illustrators,
        comics,
      };

      return res.status(200).send(output);
    }
    catch(e) {
      console.log(e);
      
      return res.status(500).json({ error: 'Failed to complete operation' });
    }
  };

  return getEachKey();
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
          res.status(200).json({ msg: 'Comic updated successfully' });
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
          res.status(200).json({ msg: 'Comic deleted successfully' });
        }
      }
    );
  } catch {
    res.status(500).json({ error: 'Failed to complete operation' });
  }
}