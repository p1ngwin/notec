import mongoose from "mongoose";

export interface IPerson {
  id?: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
  user_id: mongoose.Schema.Types.ObjectId;
}
