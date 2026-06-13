import { createUser, loginUser, logoutCurrentUser, getAllUsers, getUserProfile, updateCurrentUserProfile, } from "../controllers/userControllers.js";
import express from "express";
import { validate } from "../middlewares/validate.js";
import { userSchema } from "../validations/Auth/createUserValidation.js";
import { loginSchema } from "../validations/Auth/loginUserValidation.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();
router
    .route("/")
    .post(validate(userSchema), createUser)
    .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/loginUser", validate(loginSchema), loginUser);
router.post("/logout", logoutCurrentUser);
router
    .route("/profile")
    .get(authenticate, getUserProfile)
    .put(authenticate, updateCurrentUserProfile);
export default router;
