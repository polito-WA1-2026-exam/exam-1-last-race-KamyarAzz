// imports
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import sqlite3 from "sqlite3";
import {open} from "sqlite";
import crypto from "crypto";

// init express
const app = new express();
const port = 3001;

// middlewares
app.use(morgan("dev"));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// connect the database
let db;
async function initDb() {
  db = await open({
    filename: "./db/database.sqlite",
    driver: sqlite3.Database,
  });
  console.log("Connected to the SQLite database.");
}
initDb().catch((err) => console.error("Failed to connect to db:", err));

// creates cookie
app.use(
  session({
    secret: "kamyar-random-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// TODO: add passport logic
// TODO: add routes

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
