import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("aye, I would assume it works")
});

router.get("/:id", (req, res) => {
    res.status(200).send("aye, I would assume it works")
});

router.post("/", (req, res) => {
    res.status(200).send("aye, I would assume it works")
});

router.put("/:id", (req, res) => {
    res.status(200).send("aye, I would assume it works")
});

router.delete("/:id", (req, res) => {
    res.status(200).send("aye, I would assume it works")
});

export default router;
