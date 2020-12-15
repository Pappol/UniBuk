import express from "express";
import { queryAll } from "../controllers/search.js";

const router = express.Router();
router.get("/all/:query", queryAll);
export default router;
