import { createUser, loginUser } from "../controllers/userControllers.js";
import express from "express";
import { validate } from "../middlewares/validate.js";
import { userSchema } from "../validations/Auth/createUserValidation.js";

const router = express.Router();
router.route("/").post(validate(userSchema), createUser);
router.post("/auth", loginUser);
export default router;
