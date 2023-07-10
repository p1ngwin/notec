import { model } from "mongoose";
import { IAppointment } from "../types/appointment/types";
import { AppointmentSchema } from "../schema/Appointment";

export const AppointmentModel = model<IAppointment>("Appointments", AppointmentSchema);