import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Patient } from "../entities/Patient";

export const getPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const patientRepo = AppDataSource.getRepository(Patient);
    const patient = await patientRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["diagnoses", "medications", "allergies", "appointments"],
    });

    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getPatients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const patientRepo = AppDataSource.getRepository(Patient);
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;

    const [patients, totalPatients] = await patientRepo.findAndCount({
      take: limitNumber,
      skip: offset,
    });

    const totalPages = Math.ceil(totalPatients / limitNumber);

    res.status(200).json({
      patients,
      pagination: {
        totalItems: totalPatients,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
