import mongoose from "mongoose";
import { IService, SERVICE_TYPES } from "../types/service/types";

const Schema = mongoose.Schema;

export const ServiceSchema = new Schema<IService>({
  service: {
    type: String,
    enum: SERVICE_TYPES,
    required: true,
  },
});
