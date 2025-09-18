import express from 'express';
import TestRoute from "./test.js";
import AuthRoutes from "./auth/routes.js"

const router = express.Router();

router.use("/test", TestRoute);
router.use("/auth", AuthRoutes);

export default router;