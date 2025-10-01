import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("aye, I would assume it works")
})

export default router;
