import { model } from "mongoose";
import { IRevenue } from "../types/revenue/types";
import { RevenueSchema } from "../schema/Revenue";

export const RevenueModel = model<IRevenue>("Revenue", RevenueSchema);
