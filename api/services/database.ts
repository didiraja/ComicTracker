import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./comictracker.db');

export const StartingDB = () => {
  db.serialize(() => {
  
    db.run(`CREATE TABLE IF NOT EXISTS "comics" (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      publisher_id INTEGER NOT NULL,
      title VARCHAR(255) NOT NULL,
      issue INTEGER NOT NULL,
      year INTEGER NOT NULL,
      writer_id INTEGER NOT NULL,
      penciller_id INTEGER NOT NULL,
      FOREIGN KEY (publisher_id) REFERENCES publishers(id),
      FOREIGN KEY (writer_id) REFERENCES writers(id),
      FOREIGN KEY (penciller_id) REFERENCES pencillers(id)
    )`);
  
    db.run(`
      CREATE TABLE IF NOT EXISTS publishers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);
  
    db.run(`
      CREATE TABLE IF NOT EXISTS writers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);
  
    db.run(`
      CREATE TABLE IF NOT EXISTS pencillers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);
    
    const publishers = ['Marvel', 'DC', 'Image', 'Manga'];
  
    const insertPublisher = db.prepare('INSERT OR IGNORE INTO publishers (name) VALUES (?)');
  
    publishers.forEach((publisher) => {
      insertPublisher.run(publisher);
    });
  
    insertPublisher.finalize();
  });
}
