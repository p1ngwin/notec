import { model } from "mongoose";
import { IService } from "../types/service/types";
import { ServiceSchema } from "../schema/Service";

export const ServiceModel = model<IService>("Services", ServiceSchema);
