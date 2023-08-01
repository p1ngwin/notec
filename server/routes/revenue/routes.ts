import express from "express";
import RevenueController from "../../controllers/RevenueController";

const router = express.Router();

router.post("/create", RevenueController.createRevenue);
router.get("/all", RevenueController.getRevenue);
router.get("/:id", RevenueController.getRevenueById);
router.delete("/delete/:id", RevenueController.deleteRevenueById);

export default router;
