import api from "./api";
import type { Patient } from "../types/patient";

/* ---------------- GET ALL PATIENTS ---------------- */

export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get("/patients/");
  return response.data;
};

/* ---------------- GET SINGLE PATIENT ---------------- */

export const getPatient = async (
  id: number
): Promise<Patient> => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

/* ---------------- DASHBOARD STATS ---------------- */

export interface DashboardStats {
  todayPatients: number;
  voiceStatus: string;
  totalPatients: number;
  activeCases: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

/* ---------------- ANALYTICS SUMMARY ---------------- */

export interface AnalyticsSummary {
  totalPatients: number;
  todayPatients: number;
  malePatients: number;
  femalePatients: number;
}

export const getAnalyticsSummary =
  async (): Promise<AnalyticsSummary> => {
    const response = await api.get("/analytics/summary");
    return response.data;
  };

  /* ---------------- WEEKLY ANALYTICS ---------------- */

export interface WeeklyAnalytics {
  day: string;
  patients: number;
}

export const getWeeklyAnalytics =
  async (): Promise<WeeklyAnalytics[]> => {
    const response = await api.get("/analytics/weekly");
    return response.data;
  };

  /* ---------------- TOP DISEASES ---------------- */

export interface TopDisease {
  disease: string;
  patients: number;
}

export const getTopDiseases = async (): Promise<TopDisease[]> => {
  const response = await api.get("/analytics/top-diseases");
  return response.data;
};

/* ---------------- MONTHLY PATIENTS ---------------- */

export interface MonthlyPatient {
  month: string;
  patients: number;
}

export const getMonthlyPatients = async (): Promise<MonthlyPatient[]> => {
  const response = await api.get("/analytics/monthly");
  return response.data;
};

/* ---------------- CREATE PATIENT ---------------- */

export const createPatient = async (
  patient: Omit<Patient, "id">
): Promise<Patient> => {
  const response = await api.post("/patients/", patient);
  return response.data;
};

/* ---------------- UPDATE PATIENT ---------------- */

export const updatePatient = async (
  id: number,
  patient: Omit<Patient, "id">
): Promise<Patient> => {
  const response = await api.put(
    `/patients/${id}`,
    patient
  );

  return response.data;
};

/* ---------------- DELETE PATIENT ---------------- */

export const deletePatient = async (
  id: number
): Promise<void> => {
  await api.delete(`/patients/${id}`);
};

/* ---------------- VOICE AI ---------------- */

export const parseVoice = async (transcript: string) => {
  const response = await api.post("/voice/parse", {
    transcript,
  });

  return response.data;
};