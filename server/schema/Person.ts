import mongoose from "mongoose";
import { IPerson } from "../types/Person";
const Schema = mongoose.Schema;

export const PersonSchema = new Schema<IPerson>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: String,
  phone_number: String,
});
