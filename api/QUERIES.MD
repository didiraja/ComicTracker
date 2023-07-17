# CLONE TABLE

```sql
  CREATE TABLE new_table AS SELECT * FROM original_table;
```

# CLONE ROWS

```sql
  INSERT INTO target_table (column1, column2, column3)
SELECT column1, column2, column3
FROM source_table;
```
# RENAME TABLE

```sql
  ALTER TABLE old_name RENAME TO new_name;
```
# DELETE_AHEAD

```sql
  DELETE FROM table_name WHERE id > $
```

# CREATE_TABLE

```sql
  CREATE TABLE "comics" (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  publisher_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  issue INTEGER NOT NULL,
  year INTEGER NOT NULL,
  writer_id INTEGER NOT NULL,
  illustrator_id INTEGER NOT NULL,
  FOREIGN KEY (publisher_id) REFERENCES publishers(id),
  FOREIGN KEY (writer_id) REFERENCES writers(id),
  FOREIGN KEY (illustrator_id) REFERENCES illustrators(id)
  )
```

# GET_COMICS

```sql
  SELECT * FROM comics
```

# ALL_CATEGORIES

```sql
  SELECT name FROM sqlite_master WHERE type='table' LIMIT -1 OFFSET 1
```

# ALL WITH ID

```sql
  SELECT * FROM writers WHERE id = 4
```
