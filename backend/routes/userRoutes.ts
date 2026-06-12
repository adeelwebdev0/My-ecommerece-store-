import {
  createUser,
  loginUser,
  logoutCurrentUser,
} from "../controllers/userControllers.js";
import express from "express";
import { validate } from "../middlewares/validate.js";
import { userSchema } from "../validations/Auth/createUserValidation.js";
import { loginSchema } from "../validations/Auth/loginUserValidation.js";

const router = express.Router();
router.route("/").post(validate(userSchema), createUser);

router.post("/loginUser", validate(loginSchema), loginUser);
router.post("/logout", logoutCurrentUser);

export default router;
