import mongoose from "mongoose";
import { Person } from "../types/Person";
const Schema = mongoose.Schema;

export const PersonSchema = new Schema<Person>({
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
