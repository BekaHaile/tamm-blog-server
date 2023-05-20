import {
  authJwt,
} from "../middleware";
import * as controller from "../controllers/blog.controller";
import express from "express";
const router = express.Router();

router.get('/', controller.getBlogs)
router.get('/:id', controller.getBlogById)
router.post('/', [authJwt.verifyToken], controller.createBlog)
router.put('/:id', [authJwt.verifyToken], controller.updateBlog)
router.delete('/:id', [authJwt.verifyToken], controller.deleteBlog)


export default router;
