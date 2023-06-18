import { Request, Response } from "express"
import { db } from ".";

export const GetComics = (req: Request, res: Response) => {
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
}