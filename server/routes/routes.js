import express from 'express';
import TestRoute from "./test.js";
import AuthRoutes from "./auth/routes.js"
import UserRoutes from "./user.js";
import DirectoryRoutes from "./directory.js";
import SheetRoutes from "./sheet.js";
import TagRoutes from "./tag.js";
import AdminRoutes from "./admin.js";

const router = express.Router();

router.use("/test", TestRoute);
router.use("/auth", AuthRoutes);

// Database interaction routes
router.use("/user", UserRoutes);
router.use("/directory", DirectoryRoutes);
router.use("/sheet", SheetRoutes);
router.use("/tag", TagRoutes);
router.use("/admin", AdminRoutes);

export default router;
