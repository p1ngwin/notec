import mongoose from "mongoose";
import { IAppointment, SERVICE_TYPES } from "../types/appointment/types";
const Schema = mongoose.Schema;

export const AppointmentSchema = new Schema<IAppointment>({
    service: {
        type: [String],
        enum: SERVICE_TYPES,
        required: true
    },
    person_id: {
        ref: "Person",
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: Date,
        required: true
    }
});
