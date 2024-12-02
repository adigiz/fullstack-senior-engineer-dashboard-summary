import { apiService } from "./axios";

export const getAllPatient = async () => {
  const res = await apiService.get("/patients");

  return res;
};

export const getPatientById = async (id: string) => {
  const res = await apiService.get(`/patients/${id}`);
  return res;
};
