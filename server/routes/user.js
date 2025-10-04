import express from "express";
import {User} from "../models/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("aye, I would assume it works")
});

router.get("/:id", (req, res) => {
  res.status(200).send("aye, I would assume it works")
});

router.delete("/:id", (req, res) => {
  res.status(200).send("aye, I would assume it works")
});

export default router;
