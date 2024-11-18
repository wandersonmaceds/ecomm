--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY,
  login TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at NUMERIC  NOT NULL DEFAULT(CURRENT_TIMESTAMP),
  update_at NUMERIC NOT NULL DEFAULT(CURRENT_TIMESTAMP)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE IF EXISTS accounts;