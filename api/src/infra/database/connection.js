import sqlite from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "data.db",
  driver: sqlite.Database,
});

export default db;
