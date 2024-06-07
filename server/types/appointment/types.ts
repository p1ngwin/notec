import mongoose from "mongoose";

export interface IAppointment {
  id?: string;
  date: Date;
  time: Date;
  service_id: [mongoose.Schema.Types.ObjectId];
  client_id: mongoose.Schema.Types.ObjectId;
  payment_date?: Date;
  uuid: string; // Firebase user id
}

export enum HAIR_TYPE {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
}

export enum SERVICE_TYPES {
  CUT = "CUT",
  COLOR = "COLOR",
}
// TODO: brisanje naročila
//urejanje
