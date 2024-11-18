--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id INTEGER,
  created_at NUMERIC  NOT NULL DEFAULT(CURRENT_TIMESTAMP),
  update_at NUMERIC NOT NULL DEFAULT(CURRENT_TIMESTAMP),

  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE IF EXISTS categories;