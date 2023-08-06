import express from "express";
import PersonController from "../../controllers/PersonController";

const router = express.Router();

router.post("/add", PersonController.createPerson);
router.get("/all", PersonController.getAllPersons);
router.get("/:id", PersonController.getPerson);
router.patch("/update/:id", PersonController.updatePerson);
router.delete("/delete/:id", PersonController.deletePerson);

export default router;
