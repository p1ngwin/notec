import mongoose from "mongoose";
import { IRevenue } from "../types/revenue/types";

const Schema = mongoose.Schema;

export const RevenueSchema = new Schema<IRevenue>({
  name: {
    type: String,
    required: false,
  },
  net_profit: {
    type: Number,
    required: true,
  },
  real_profit: {
    type: Number,
    required: true,
  },
  payment_type: {
    type: String,
    required: true,
  },
  person_id: {
    // Stranka
    type: String,
    required: false,
  },
  service_id: {
    // Storitev
    type: String,
    requrired: false,
  },
  uuid: {
    type: String,
    required: true,
  },
});
