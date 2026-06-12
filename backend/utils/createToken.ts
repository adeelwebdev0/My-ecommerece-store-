
import jwt, { SignOptions } from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: string): string => {
  const options: SignOptions = {
    expiresIn: "30d",
  };

  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, options);

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;