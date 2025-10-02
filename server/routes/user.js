import express from "express";

import { User } from "../models/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("aye, I would assume it works")
});

router.get("/:id", (req, res) => {
  res.status(200).send("aye, I would assume it works")
});

router.post("/", (req, res) => {
  const { discord_id } = req.body;

  if (!discord_id) return res.status(400).send("Missing required field: discord_id")
});

router.put("/:id", (req, res) => {
  res.status(200).send("aye, I would assume it works")
});

router.delete("/:id", (req, res) => {
  res.status(200).send("aye, I would assume it works")
});

export default router;
