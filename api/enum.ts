export const QUERIES = {
  CREATE_TABLE: `CREATE TABLE "comics" (
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
  )`,
  GET_COMICS: 'SELECT * FROM comics',
  ALL_CATEGORIES: "SELECT name FROM sqlite_master WHERE type='table' LIMIT -1 OFFSET 1;"
}