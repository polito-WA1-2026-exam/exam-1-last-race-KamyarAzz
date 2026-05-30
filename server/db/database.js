import sqlite3 from "sqlite3";
import {open} from "sqlite";

let db = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: "./db/database.sqlite",
      driver: sqlite3.Database,
    });
    console.log("Connected to the SQLite database.");
  }
  return db;
}
