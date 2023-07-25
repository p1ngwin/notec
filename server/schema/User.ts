import mongoose from "mongoose";
import { IUser } from "../types/user/types";

const Schema = mongoose.Schema;

export const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  unique: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  lastLogin: Date,
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});
