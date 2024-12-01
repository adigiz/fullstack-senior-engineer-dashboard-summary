import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Patient } from "../entities/Patient";
import { wrapResponse } from "../utils/responseWrapper";
import { Diagnosis } from "../entities/Diagnosis";
import { Medication } from "../entities/Medication";
import { Allergy } from "../entities/Allergy";
import { Appointment } from "../entities/Appointment";

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
      res.status(404).json(wrapResponse({}, "Patient not found"));
      return;
    }

    res.json(wrapResponse(patient));
  } catch (error) {
    res.status(500).json(wrapResponse({}, "Internal server error"));
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

    res.status(200).json(
      wrapResponse({
        patients,
        pagination: {
          totalItems: totalPatients,
          totalPages,
          currentPage: pageNumber,
          pageSize: limitNumber,
        },
      })
    );
  } catch (error) {
    res.status(500).json(wrapResponse({}, "Internal server error"));
  }
};

export const getDiagnoses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;
    const diagnosesRepo = AppDataSource.getRepository(Diagnosis);
    const [diagnoses, totalDiagnoses] = await diagnosesRepo.findAndCount({
      where: { patient: { id: parseInt(req.params.id) } },
      take: limitNumber,
      skip: offset,
    });

    const totalPages = Math.ceil(totalDiagnoses / limitNumber);

    res.status(200).json(
      wrapResponse({
        diagnoses,
        pagination: {
          totalItems: totalDiagnoses,
          totalPages,
          currentPage: pageNumber,
          pageSize: limitNumber,
        },
      })
    );
  } catch (error) {
    res.status(500).json(wrapResponse({}, "Internal server error"));
  }
};

export const getMedications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;
    const medicationRepo = AppDataSource.getRepository(Medication);

    const [medications, totalMedications] = await medicationRepo.findAndCount({
      where: { patient: { id: parseInt(req.params.id) } },
      take: limitNumber,
      skip: offset,
    });

    const totalPages = Math.ceil(totalMedications / limitNumber);

    res.status(200).json(
      wrapResponse({
        medications,
        pagination: {
          totalItems: totalMedications,
          totalPages,
          currentPage: pageNumber,
          pageSize: limitNumber,
        },
      })
    );
  } catch (error) {
    res.status(500).json(wrapResponse({}, "Internal server error"));
  }
};

export const getAllergies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allergyRepo = AppDataSource.getRepository(Allergy);
    const allergies = await allergyRepo.find({
      where: { patient: { id: parseInt(req.params.id) } },
    });

    res.status(200).json(wrapResponse(allergies));
  } catch (error) {
    res.status(500).json(wrapResponse([], "Internal server error"));
  }
};

export const getAppointments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;
    const appointmentRepo = AppDataSource.getRepository(Appointment);
    const [appointments, totalAppointments] =
      await appointmentRepo.findAndCount({
        where: { patient: { id: parseInt(req.params.id) } },
        take: limitNumber,
        skip: offset,
      });

    const totalPages = Math.ceil(totalAppointments / limitNumber);

    res.status(200).json(
      wrapResponse({
        appointments,
        pagination: {
          totalItems: totalAppointments,
          totalPages,
          currentPage: pageNumber,
          pageSize: limitNumber,
        },
      })
    );
  } catch (error) {
    res.status(500).json(wrapResponse({}, "Internal server error"));
  }
};
