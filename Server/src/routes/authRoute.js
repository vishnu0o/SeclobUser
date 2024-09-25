import express from "express";
import { loginController, registrationController } from "../controller/authController.js";

const router = express.Router();

router.route("/register").post(registrationController);
router.route("/login").post(loginController);


export default router;
