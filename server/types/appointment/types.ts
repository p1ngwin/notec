import mongoose, { Date } from "mongoose"

export interface IAppointment {
    id?: string,
    service: SERVICE_TYPES[]
    date: Date
    time: Date
    person_id: mongoose.Schema.Types.ObjectId
}

export enum HAIR_TYPE {
    SHORT = "SHORT",
    MEDIUM = "MEDIUM",
    LONG = "LONG"
}

export enum SERVICE_TYPES {
    CUT = "CUT",
    COLOR = "COLOR",
}

