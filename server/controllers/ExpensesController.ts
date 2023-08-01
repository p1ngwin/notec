import { Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { IExpenses } from "../types/expenses/types";
import { ExpensesModel } from "../models/Expenses";

const ExpensesController = {
  getExpenses: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });
    try {
      const expenses: IExpenses[] = await ExpensesModel.find({ uuid: uid });

      if (!expenses || expenses.length < 1)
        return res.status(204).json({ error: "No data found." });

      return res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Error getting data" });
    }
  },

  getExpenseById: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });
    if (!isValidObjectId(req?.params?.id))
      return res.status(500).json({ error: "Wrong ID format!" });

    const id = new mongoose.Types.ObjectId(req?.params?.id);

    try {
      const expenses: IExpenses | null = await ExpensesModel.findOne({
        _id: id,
        uuid: uid,
      });
      if (expenses && expenses !== null) return res.status(200).json(expenses);

      return res.status(404).json({ error: "Expense not found!" });
    } catch (error) {
      res.status(500).json({ error: "Error retreiving expenses" });
    }
  },

  createExpense: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });
    const { name, cost, due_date, payment_date } = req.body ?? {};

    if (!req.body)
      return res.status(400).json({ error: "Please provide required data" });

    try {
      const expenseData: IExpenses = {
        cost,
        due_date,
        payment_date,
        name,
        uuid: uid,
      };

      const newExpense = new ExpensesModel(expenseData);

      await newExpense.save();
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ error: "Error creating expense" });
    }
  },
  deleteExpenseById: async (req: Request, res: Response) => {
    const { uid } = req.user ?? {};
    if (!uid) return res.status(401).json({ error: "Not authorized" });
    const { id } = req.params;

    try {
      const deletedExpense = await ExpensesModel.findOneAndDelete({
        id,
        uuid: uid,
      });

      if (!deletedExpense) {
        return res.status(404).json({ error: "Expense not found!" });
      }
      res.json(deletedExpense);
    } catch (error) {
      res.status(500).json({ error: "Error deleting expense" });
    }
  },
};

export default ExpensesController;
