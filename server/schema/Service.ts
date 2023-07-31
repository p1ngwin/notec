import mongoose from "mongoose";
import { IService } from "../types/service/types";

const Schema = mongoose.Schema;

export const ServiceSchema = new Schema<IService>({
  service: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});
