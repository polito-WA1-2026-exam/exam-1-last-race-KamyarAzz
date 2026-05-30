// imports
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import {getDb} from "./db/database.js";
import {router as gameRoutes} from "./routes/gameRoutes.js";

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

// connect the db

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

// routes
app.use("/api/games", gameRoutes);

const startServer = async () => {
  // connect to the database
  await getDb();

  // activate the server
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

startServer();
