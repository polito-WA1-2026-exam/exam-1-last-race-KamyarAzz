import sqlite3 from "sqlite3";
import {open} from "sqlite";
import crypto from "crypto";

// Static data (Stations & Lines)
const linesData = {
  Red: ["Central Hub", "Oak Street", "River Park", "North Gate"],
  Blue: ["Central Hub", "East Market", "Old Road", "South Square", "Airport"],
  Green: ["Oak Street", "East Market", "Hilltop", "University"],
  Yellow: ["North Gate", "Tech District", "South Square", "Harbor Point"],
};

// Static data (Events)
const eventsData = [
  {description: "Quiet journey", effect: 0},
  {description: "Kind passenger gives you advice", effect: +1},
  {description: "You find a forgotten ticket", effect: +2},
  {description: "Smooth ride, no delays", effect: +1},
  {description: "Wrong platform, minor delay", effect: -1},
  {description: "Crowded carriage", effect: -1},
  {description: "Ticket inspector fine", effect: -2},
  {description: "Train delay due to signal issue", effect: -2},
  {description: "Lost wallet moment", effect: -3},
  {description: "Major system failure, reroute needed", effect: -4},
  {description: "Lucky upgrade to faster line", effect: +3},
  {description: "Unexpected bonus reward", effect: +4},
];

// Static data (Users)
const users = [
  {username: "Alice", password: "password123"},
  {username: "Bob", password: "password123"},
  {username: "Charlie", password: "password123"},
];

// Hashes the passwords using the crypto library
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto.scryptSync(password, salt, 32).toString("hex");
  return {salt, hashedPassword};
}

// Open the database (creates the file if it doesnt exist)
async function buildDatabase() {
  const db = await open({
    filename: "./db/database.sqlite",
    driver: sqlite3.Database,
  });

  // Log that the database is open
  console.log("Database opened. Creating tables...");

  // Create Tables
  await db.exec(`
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS line_stations;
    DROP TABLE IF EXISTS stations;
    DROP TABLE IF EXISTS lines;
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      hashed_password TEXT NOT NULL,
      salt TEXT NOT NULL
    );

    CREATE TABLE events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      effect INTEGER NOT NULL
    );

    CREATE TABLE lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE line_stations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      line_id INTEGER NOT NULL,
      station_id INTEGER NOT NULL,
      stop_number INTEGER NOT NULL,
      FOREIGN KEY(line_id) REFERENCES lines(id),
      FOREIGN KEY(station_id) REFERENCES stations(id)
    );

    CREATE TABLE games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      score INTEGER NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);

  // Log that the tables have been created
  console.log("Tables created. Seeding data...");

  // Seed (Events)
  for (const event of eventsData) {
    await db.run("INSERT INTO events (description, effect) VALUES (?, ?)", [
      event.description,
      event.effect,
    ]);
  }

  // Seed (Users)
  for (let i = 0; i < 3; i++) {
    const username = users[i].username;
    const {salt, hashedPassword} = hashPassword(users[i].password);
    await db.run(
      "INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)",
      [username, hashedPassword, salt],
    );
  }

  // Seed (Games) (2 for Alice, 1 for Bob)
  await db.run("INSERT INTO games (user_id, score) VALUES (?, ?)", [1, 25]);
  await db.run("INSERT INTO games (user_id, score) VALUES (?, ?)", [1, 15]);
  await db.run("INSERT INTO games (user_id, score) VALUES (?, ?)", [2, 30]);

  // Seed Lines, Stations, & the Junction Table
  for (const [lineName, stationsArray] of Object.entries(linesData)) {
    // Isert Line
    const lineResult = await db.run("INSERT INTO lines (name) VALUES (?)", [
      lineName,
    ]);
    const lineId = lineResult.lastID;

    let stopNumber = 1;
    // Insert station or (ignore if it already exists)
    for (const stationName of stationsArray) {
      await db.run("INSERT OR IGNORE INTO stations (name) VALUES (?)", [
        stationName,
      ]);

      // Get the station ID (whether just created or already existed)
      const station = await db.get("SELECT id FROM stations WHERE name = ?", [
        stationName,
      ]);

      // Link station to the line
      await db.run(
        "INSERT INTO line_stations (line_id, station_id, stop_number) VALUES (?, ?, ?)",
        [lineId, station.id, stopNumber],
      );
      stopNumber++;
    }
  }

  console.log("Database seeded successfully!");
  await db.close();
}

buildDatabase().catch((err) => {
  console.error("Error setting up database:", err);
});
