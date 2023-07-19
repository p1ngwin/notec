import mongoose from "mongoose";

export interface IService {
  id?: string;
  service: string;
  price?: number;
}

export enum HAIR_TYPE {
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
  LONG = "LONG",
}
