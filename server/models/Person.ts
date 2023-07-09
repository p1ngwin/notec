import { model } from "mongoose";
import { Person } from "../types/Person";
import { PersonSchema } from "../schema/Person";

export const PersonModel = model<Person>("Person", PersonSchema);
