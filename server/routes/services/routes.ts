import express from "express";
import ServiceController from "../../controllers/ServiceController";

const router = express.Router();

router.post("/create", ServiceController.createService);
router.get("/all", ServiceController.getServices);
router.delete("/delete/:id", ServiceController.deleteService);

export default router;
