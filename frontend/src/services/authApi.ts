import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  is_active: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const login = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};