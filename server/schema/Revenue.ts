import mongoose from "mongoose";
import { IRevenue } from "../types/revenue/types";

const Schema = mongoose.Schema;

export const RevenueSchema = new Schema<IRevenue>({
  name: {
    type: String,
    required: false,
  },
  net_profit: Number,
  real_profit: Number,
  payment_type: String,
  service_id: [
    {
      ref: "Service",
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
  client_id: {
    ref: "Person",
    type: Schema.Types.ObjectId,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  date: Date,
});
