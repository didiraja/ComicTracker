export const QUERIES = {
  // C
  CREATE_COMICS: `CREATE TABLE IF NOT EXISTS "comics" (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    publisher_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    issue INTEGER NOT NULL,
    year INTEGER NOT NULL,
    writer_id INTEGER NOT NULL,
    illustrator_id INTEGER NOT NULL,
    FOREIGN KEY (publisher_id) REFERENCES publishers(id),
    FOREIGN KEY (writer_id) REFERENCES writers(id),
    FOREIGN KEY (illustrator_id) REFERENCES illustrators(id)
  )`,
  CREATE_PUBLISHERS: `
  CREATE TABLE IF NOT EXISTS publishers (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE
  )
`,
  DEFAULT_PUBLISHERS: 'INSERT OR IGNORE INTO publishers (name) VALUES (?)',
  CREATE_WRITERS: `
  CREATE TABLE IF NOT EXISTS writers (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE
  )
`,
  CREATE_ILLUSTRATORS: `
  CREATE TABLE IF NOT EXISTS illustrators (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE
  )
`,
  NEW_COMIC: `INSERT INTO comics (publisher_id, title, issue, year, writer_id, illustrator_id)
  VALUES (?, ?, ?, ?, ?, ?)`,
  // R
  GET_PUBLISHERS: 'SELECT * from publishers',
  GET_WRITERS: 'SELECT * from writers',
  GET_ILLUSTRATORS: 'SELECT * from illustrators',
  GET_COMICS: `SELECT c.id, c.title, c.issue, c.year, p.name AS publisher, w.name AS writer, i.name AS illustrator
  FROM comics c
  JOIN publishers p ON c.publisher_id = p.id
  JOIN writers w ON c.writer_id = w.id
  JOIN illustrators i ON c.illustrator_id = i.id;`,
  // U
  EDIT_COMIC: `UPDATE comics
  SET publisher_id = ?, title = ?, issue = ?, year = ?, writer_id = ?, illustrator_id = ?
  WHERE id = ?`,
  // D
  DELETE_COMIC: `DELETE FROM comics WHERE id = ?`
}