import express from "express";
import {
  getLeaderboard,
  getNetwork,
  getRandomStations,
  getRandomEvents,
  addToLeaderboard,
} from "../controllers/gameController.js";
import {isLoggedIn} from "../middlewares/auth.js";

const router = express.Router();

router.get("/leaderboard", isLoggedIn, getLeaderboard);
router.post("/leaderboard", isLoggedIn, addToLeaderboard);
router.get("/network", isLoggedIn, getNetwork);
router.get("/random-stations", isLoggedIn, getRandomStations);
router.post("/random-events", isLoggedIn, getRandomEvents);

export {router};
