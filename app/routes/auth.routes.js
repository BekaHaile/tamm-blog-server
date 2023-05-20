import * as controller from "../controllers/auth.controller";
import express from "express";
const router = express.Router();

router.post("/signup", controller.signup);

router.post("/login", controller.login);

export default router;
