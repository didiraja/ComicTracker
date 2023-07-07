import sqlite3 from 'sqlite3';
import { QUERIES } from '../enum';

export const db = new sqlite3.Database(
  process.env.NODE_ENV ? './ctdb_prod.db' : './ctdb_dev.db'
);

export const StartingDB = () => {
  db.serialize(() => {
  
    db.run(QUERIES.CREATE_COMICS);
  
    db.run(QUERIES.CREATE_PUBLISHERS);
  
    db.run(QUERIES.CREATE_WRITERS);
  
    db.run(QUERIES.CREATE_ILLUSTRATORS);
    
    const publishers = ['Marvel', 'DC', 'Image', 'Manga'];
  
    const insertPublisher = db.prepare(QUERIES.DEFAULT_PUBLISHERS);
  
    publishers.forEach((publisher) => {
      insertPublisher.run(publisher);
    });
  
    insertPublisher.finalize();
  });
}
