import express from 'express';
import Discord from "./discord.js";

const router = express.Router();

router.use("/discord", Discord);

router.get("/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Not authorized");
    }

    const {access_token, refresh_token, ...userData} = req.session.user;

    return res.json(userData);

});

export default router;