import api from "./api";

export interface DatabaseStatus {
  status: string;
  database: string;
  patients: number;
  settings: number;
  api: string;
}

export const getDatabaseStatus = async (): Promise<DatabaseStatus> => {
  const response = await api.get("/database/status");
  return response.data;
};