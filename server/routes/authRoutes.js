import express from "express";
import passport from "../middlewares/passport.js";
import {login, logout, checkSession} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/", login);
router.get("/current", checkSession);
router.delete("/current", logout);

export {router};
