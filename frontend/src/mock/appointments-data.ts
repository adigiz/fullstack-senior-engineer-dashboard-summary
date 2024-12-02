import { TAppointmentsItem } from "@/types/appointment";

export const APPOINTMENTS_DATA_MOCK: TAppointmentsItem[] = [
  {
    id: 1,
    patient_name: "Micale Aros",
    appointment_date: "2024-12-01 09:00:00",
    reason: "Routine checkup",
    status: "Scheduled",
    appointment_type: "Appointment",
  },
  {
    id: 2,
    patient_name: "Yeager Sono",
    appointment_date: "2024-12-01 11:00:00",
    reason: "Follow-up for diabetes",
    status: "Scheduled",
    appointment_type: "Appointment",
  },
  {
    id: 3,
    patient_name: "Braun Strauss",
    appointment_date: "2024-12-01 14:00:00",
    reason: "Asthma medication refill",
    status: "Scheduled",
    appointment_type: "Medication",
  },
  {
    id: 4,
    patient_name: "Zeke Strauss",
    appointment_date: "2024-12-02 10:30:00",
    reason: "Pollen allergy treatment",
    status: "Scheduled",
    appointment_type: "Appointment",
  },
  {
    id: 5,
    patient_name: "Bolova Kale",
    appointment_date: "2024-12-02 13:00:00",
    reason: "Collect prescribed inhaler",
    status: "Scheduled",
    appointment_type: "Medication",
  },
];
