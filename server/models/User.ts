import { model } from "mongoose";
import { IUser } from "../types/user/types";
import { UserSchema } from "../schema/User";

export const UserModel = model<IUser>("Appointments", UserSchema);
