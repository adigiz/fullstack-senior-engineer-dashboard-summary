import express from "express";
import {
  getPatient,
  getPatients,
  getDiagnoses,
  getMedications,
  getAllergies,
  getAppointments,
} from "../controllers/patientController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

router.get("/", authenticate, authorize(["admin"]), getPatients);
router.get("/:id", getPatient);
router.get("/:id/diagnoses", getDiagnoses);
router.get("/:id/medications", getMedications);
router.get("/:id/allergies", getAllergies);
router.get("/:id/appointments", getAppointments);

export default router;
