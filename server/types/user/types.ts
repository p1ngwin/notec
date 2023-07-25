import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  unique: true;
  password: string;
  hashedPassword: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  lastLogin: Date;
}
