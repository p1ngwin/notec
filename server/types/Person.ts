import { Document, Model } from "mongoose";

export interface IPerson {
  id?: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
}

export interface IPersonModel extends Model<Document, IPerson> { }
