import asyncHandler from "../middlewares/asyncHandler.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
// Creating User
const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);

  if (!username || !email || !password) {
    throw new Error("Please fill al the credentials");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();

    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    throw new Error("invalid user data");
  }
});
// Login the user
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (isPasswordValid) {
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
});
export { createUser, loginUser };
