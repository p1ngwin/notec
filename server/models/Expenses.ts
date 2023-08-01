import { model } from "mongoose";
import { ExpensesSchema } from "../schema/Expenses";
import { IExpenses } from "../types/expenses/types";

export const ExpensesModel = model<IExpenses>("Expenses", ExpensesSchema);
