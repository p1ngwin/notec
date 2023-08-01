import mongoose from "mongoose";
import { IExpenses } from "../types/expenses/types";

const Schema = mongoose.Schema;

export const ExpensesSchema = new Schema<IExpenses>({
  name: {
    type: String,
    required: false,
  },
  cost: {
    type: Number,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  payment_date: {
    type: Date,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});
