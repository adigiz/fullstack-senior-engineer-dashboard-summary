import express from "express";
import { getPatient, getPatients } from "../controllers/patientController";

const router = express.Router();

router.get("/", getPatients);
router.get("/:id", getPatient);

export default router;
