import { model } from "mongoose";
import { IPerson, IPersonModel } from "../types/Person";
import { PersonSchema } from "../schema/Person";

export const PersonModel = model<IPerson>("Person", PersonSchema);
