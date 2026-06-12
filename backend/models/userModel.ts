import mongoose, { Document } from "mongoose";
import { required } from "zod/mini";
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);
const User = mongoose.model<User>("User", userSchema);
export default User;
