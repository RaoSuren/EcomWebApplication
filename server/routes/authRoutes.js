import express from "express";
import { requireSignIn } from "../middleware/authMiddleware.js";
import {
  registerController,
  loginController,
} from "../controller/authController.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
