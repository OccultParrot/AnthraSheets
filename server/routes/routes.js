import express from 'express';
import TestRoute from "./test.js";
import AuthRoutes from "./auth/routes.js"
import UserRoutes from "./user.js";
const router = express.Router();

router.use("/test", TestRoute);
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

export default router;
