import api from "./api";

export interface Settings {
  id: number;

  // Hospital
  hospital_name: string;
  hospital_address: string;
  hospital_phone: string;
  hospital_email: string;

  // Admin
  admin_name: string;
  admin_email: string;
  admin_phone: string;
  admin_role: string;

  // Voice AI
  voice_language: string;
  voice_timeout: number;
  voice_confidence: number;
}

/* ---------------- GET SETTINGS ---------------- */

export const getSettings = async (): Promise<Settings> => {
  const response = await api.get("/settings/");
  return response.data;
};

/* ---------------- UPDATE SETTINGS ---------------- */

export const updateSettings = async (
  settings: Omit<Settings, "id">
): Promise<Settings> => {
  const response = await api.put("/settings/", settings);
  return response.data;
};