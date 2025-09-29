import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.status(200).send());
router.get("/:id", (req, res) => res.status(200).send());
router.post("/:id", (req, res) => res.status(200).send());

router.get("/:id/directories", (req, res) => res.status(200).send());
router.post("/:id/directories", (req, res) => res.status(200).send());
router.delete("/:id/directories/:id", (req, res) => res.status(200).send());

router.get("/:id/sheets", (req, res) => res.status(200).send());
router.post("/:id/sheets", (req, res) => res.status(200).send());
router.delete("/:id/sheets/:id", (req, res) => res.status(200).send());

router.get("/:id/directories/recent", (req, res) => res.status(200).send());
router.get("/:id/sheets/recent", (req, res) => res.status(200).send());

export default router;
