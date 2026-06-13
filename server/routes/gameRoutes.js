import express from "express";
import {
  getLeaderboard,
  getNetwork,
  getRandomStations,
} from "../controllers/gameController.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);
router.get("/network", getNetwork);
router.get("/random-stations", getRandomStations);

export {router};
