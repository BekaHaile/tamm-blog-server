import AuthRoutes from "./auth.routes";
import BlogRoutes from "./blog.routes";
import express from "express";

const router = express.Router();
router.use("/auth", AuthRoutes);
router.use("/blogs", BlogRoutes);

export default router;
