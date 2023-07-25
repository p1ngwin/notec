import mongoose from "mongoose";

export interface IService {
  id?: string;
  service: string;
  price?: number;
  user_id: mongoose.Schema.Types.ObjectId;
}

export enum HAIR_TYPE {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
}
