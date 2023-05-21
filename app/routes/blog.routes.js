import { authJwt, imageUpload } from "../middleware";
import * as controller from "../controllers/blog.controller";
import express from "express";
const router = express.Router();

router.get("/", controller.getBlogs);
router.get("/:id", controller.getBlogById);
router.post("/", controller.createBlog);
router.put("/:id", [authJwt.verifyToken], controller.updateBlog);
router.delete("/:id", [authJwt.verifyToken], controller.deleteBlog);

router.post(`/upload`, [imageUpload.uploadImage], controller.upload);

export default router;
