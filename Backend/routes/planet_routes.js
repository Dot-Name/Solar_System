import express from "express";
import { postPlanet, getPlanets } from "../controller/planet_controller.js";

const router = express.Router();

router.post("/planet/post", postPlanet);
router.get("/planet/get", getPlanets);

export default router;