import mongoose from "mongoose";
import { IAppointment } from "../types/appointment/types";
const Schema = mongoose.Schema;

export const AppointmentSchema = new Schema<IAppointment>({
  service_id: [
    {
      ref: "Service",
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
  person_id: {
    ref: "Person",
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});
