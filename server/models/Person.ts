import { model } from "mongoose";
import { IPerson } from "../types/person/types";
import { PersonSchema } from "../schema/Person";

export const PersonModel = model<IPerson>("clients", PersonSchema);
