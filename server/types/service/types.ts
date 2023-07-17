import mongoose from "mongoose";

export interface IService {
  id?: string;
  service: SERVICE_TYPES;
}

export enum HAIR_TYPE {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
}

export enum SERVICE_TYPES {
  CUT = "CUT",
  COLOR = "COLOR",
  FAN = "FAN",
}
