import express from "express";
import {getLeaderboard, getNetwork} from "../controllers/gameController.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);
router.get("/network", getNetwork);

export {router};
