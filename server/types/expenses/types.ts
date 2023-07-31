import mongoose from "mongoose";

type IExpenses = {
  id: string;
  name: string;
  cost: number;
  due_date: Date;
  payment_date: Date;
  uuid: string; // Firebase user id
};
