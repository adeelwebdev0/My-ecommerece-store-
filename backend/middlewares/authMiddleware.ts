import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

interface DecodedToken extends JwtPayload {
  userId: string;
}

// Extend Express Request to include user
interface AuthRequest extends Request {
  user?: any; // you can replace `any` with your User type later
}

const authenticate = asyncHandler(
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    let token: string | undefined;

    // Read JWT from cookie
    token = req.cookies?.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string,
        ) as DecodedToken;

        req.user = await User.findById(decoded.userId).select("-password");

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed.");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token.");
    }
  },
);

const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export { authenticate, authorizeAdmin };
