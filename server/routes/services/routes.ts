import express from "express";
import ServiceController from "../../controllers/ServiceController";

const router = express.Router();

router.post("/create", ServiceController.createService);
router.get("/all", ServiceController.getServices);
router.get("/:id", ServiceController.getService);
router.delete("/delete/:id", ServiceController.deleteService);
router.patch("/update/:id", ServiceController.updateService);

export default router;
