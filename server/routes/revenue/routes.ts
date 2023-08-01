import express from "express";
import ExpensesController from "../../controllers/ExpensesController";

const router = express.Router();

router.post("/create", ExpensesController.createExpense);
router.get("/all", ExpensesController.getExpenses);
router.get("/:id", ExpensesController.getExpenseById);
router.delete("/delete/:id", ExpensesController.deleteExpenseById);

export default router;
